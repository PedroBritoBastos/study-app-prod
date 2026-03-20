"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { deleteTaskById } from "@/features/goal/repositories/tasksRepository";
import { getGoalByUserId } from "../../repositories/goalsRepository";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(taskId: string) {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  // verifica se a meta pertence a este usuário. Lança um erro caso não pertença.
  const goal = getGoalByUserId(user.id);
  if (!goal) {
    throw new Error("Não autorizado.");
  }

  const deletedTaskId = await deleteTaskById(taskId);
  revalidatePath("/goals");
  return deletedTaskId;
}
