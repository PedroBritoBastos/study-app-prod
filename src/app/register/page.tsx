"use server";

import { connectDB } from "@/src/lib/mongodb";
import { findUserByUsername, createUser } from "@/features/auth/repositories/userRepository";
import { createPasswordHash } from "@/features/auth/utils/createPasswordHash";
import { redirect } from "next/navigation";

export async function register(
   username: string,
   password: string,
   confirmPassword: string
) {
   try {
      console.log("Register started", { username }); // <-- log inicial

      await connectDB();
      console.log("Database connected");

      if (!username || !password) throw new Error("Usuário e senha obrigatórios.");
      if (password.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres.");
      if (password !== confirmPassword) throw new Error("As senhas não conferem.");

      const existingUser = await findUserByUsername(username);
      if (existingUser) throw new Error("Este usuário já existe.");

      const hashedPassword = await createPasswordHash(password);
      const user = await createUser(username, hashedPassword);

      console.log("User created", user);

      redirect("/login");
   } catch (err) {
      console.error("Register error:", err); // <-- log do erro completo
      throw err; // relança o erro para o componente client capturar
   }
}