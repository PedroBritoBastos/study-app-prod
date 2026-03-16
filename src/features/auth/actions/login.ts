"use server";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { connectDB } from "@/src/lib/mongodb";
import { findUserByUsername } from "../repositories/userRepository";

export async function login(formData: FormData): Promise<void> {
  await connectDB();

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    throw new Error("Usuário e senha obrigatórios.");
  }

  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("Usuário ou senha inválidos.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Usuário ou senha inválidos.");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não definido.");
  }

  const token = jwt.sign({ id: user._id.toString() }, secret, {
    expiresIn: "1d",
  });

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "subjects/",
  });

  redirect("/subjects");
}
