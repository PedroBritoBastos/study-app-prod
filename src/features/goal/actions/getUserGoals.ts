"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { getUserGoals } from "../repositories/goalsRepository";

export async function getUserGoalsAction() {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const goals = await getUserGoals(user.id);
  return goals;
}
