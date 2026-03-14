"use server";

import { connectDB } from "@/src/lib/mongodb";
import { findUserByUsername, createUser } from "../repositories/userRepository";
import { createPasswordHash } from "../utils/createPasswordHash";

interface RegisterSuccess {
  user: {
    id: string;
    username: string;
  };
}

interface RegisterError {
  error: string;
}

export async function register(
  username: string,
  password: string,
): Promise<RegisterSuccess | RegisterError> {
  try {
    await connectDB();

    if (!username || !password) {
      return { error: "Usuário e senha obrigatórios." };
    }

    const existingUser = await findUserByUsername(username);

    if (existingUser) {
      return { error: "Este usuário já existe." };
    }

    const hashedPassword = await createPasswordHash(password);

    const user = await createUser(username, hashedPassword);

    return {
      user: {
        id: user._id.toString(),
        username: user.username,
      },
    };
  } catch {
    return { error: "Erro ao criar usuário." };
  }
}
