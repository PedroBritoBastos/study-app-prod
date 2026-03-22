"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { createGoal } from "@/features/goal/repositories/goalsRepository";
import { GoalType } from "../../types/Goal";

export async function createGoalAction(formData: FormData): Promise<GoalType> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const title = formData.get("title") as string;
  const deadline = formData.get("deadline") as string;

  if (!title || !deadline) {
    throw new Error("Título ou prazo não podem estar vazios.");
  }

  const createdGoal = await createGoal(title, new Date(deadline), user.id);
  return createdGoal;
}
