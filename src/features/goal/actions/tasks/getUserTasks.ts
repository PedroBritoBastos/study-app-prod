"use server";

import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { getUserTasks } from "@/features/goal/repositories/tasksRepository";
import { TaskType } from "@/features/goal/types/Task";

export async function getUserTasksAction(): Promise<TaskType[]> {
  const user = await getUserFromToken();
  if (!user) throw new Error("Não autorizado.");

  const tasks = await getUserTasks(user.id);
  if (!tasks) return [];
  return tasks;
}
