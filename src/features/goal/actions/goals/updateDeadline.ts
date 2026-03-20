"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import {
  getGoalById,
  updateGoalDeadline,
} from "../../repositories/goalsRepository";
import { revalidatePath } from "next/cache";

export async function updateDeadlineAction(id: string, newDate: string) {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const goal = await getGoalById(id);
  if (!goal) throw new Error("Meta não existe.");

  await updateGoalDeadline(id, newDate);
  revalidatePath("/goals");
}
