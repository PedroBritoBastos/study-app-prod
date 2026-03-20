"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import {
  getTaskById,
  getTaskStatus,
} from "@/features/goal/repositories/tasksRepository";

export async function getTaskStatusAction(taskId: string) {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) throw new Error("Não autorizado");

  const task = await getTaskById(taskId);
  if (!task) throw new Error("Essa tarefa não existe.");

  const taskStatus = await getTaskStatus(taskId);
  return taskStatus;
}
