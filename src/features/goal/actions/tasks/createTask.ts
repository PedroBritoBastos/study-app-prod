"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { createTask } from "@/features/goal/repositories/tasksRepository";
import { getGoalByUserId } from "../../repositories/goalsRepository";
import { revalidatePath } from "next/cache";
import { TaskType } from "../../types/Task";

export async function createTaskAction(formData: FormData) {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const title = formData.get("title") as string;
  const goalId = formData.get("goalId") as string;

  if (!title) {
    throw new Error("O nome da tarefa é obrigatório.");
  }

  // verifica se a meta pertence a este usuário. Lança um erro caso não pertença.
  const goal = getGoalByUserId(user.id);
  if (!goal) {
    throw new Error("Não autorizado.");
  }

  const task: TaskType = await createTask(title, goalId);
  return task;
}
