"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import {
  getGoalById,
  deleteGoalById,
} from "@/features/goal/repositories/goalsRepository";

export async function deleteGoalByIdAction(id: string): Promise<void> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) throw new Error("Não autorizado");

  const goal = await getGoalById(id);
  if (!goal) throw new Error("Meta não existe.");

  await deleteGoalById(id);
}
