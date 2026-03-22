"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { getGoalDealine } from "@/features/goal/repositories/goalsRepository";
import mongoose from "mongoose";

export async function getGoalDeadlineAction(id: string) {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const deadline = await getGoalDealine(id);

  if (!deadline) {
    throw new Error("Meta não encontrada");
  }

  return deadline;
}
