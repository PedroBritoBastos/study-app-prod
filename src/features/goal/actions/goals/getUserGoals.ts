"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { getUserGoals } from "../../repositories/goalsRepository";
import { GoalType } from "@/features/goal/types/Goal";

export async function getUserGoalsAction(): Promise<GoalType[]> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const goals = await getUserGoals(user.id);
  return goals;
}
