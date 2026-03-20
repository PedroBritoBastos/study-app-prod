"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { getGoalDealine } from "@/features/goal/repositories/goalsRepository";

export async function getGoalDeadlineAction(id: string) {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const deadline = await getGoalDealine(id);
  return deadline;
}
