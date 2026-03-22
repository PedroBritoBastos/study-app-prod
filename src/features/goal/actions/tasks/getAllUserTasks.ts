"use server";

import { TaskType } from "@/features/goal/types/Task";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { getAllUserTasks } from "@/features/goal/repositories/tasksRepository";

export async function getAllUserTasksAction(): Promise<TaskType[]> {
  const user = await getUserFromToken();
  if (!user) throw new Error("Não autorizado.");

  const tasks = await getAllUserTasks(user.id);
  if (!tasks) return [];

  return tasks;
}
