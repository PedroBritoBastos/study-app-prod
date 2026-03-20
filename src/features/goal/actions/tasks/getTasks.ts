"use server";

import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import {
  getGoalByUserId,
  getGoalById,
} from "@/features/goal/repositories/goalsRepository";
import { getTasks } from "@/features/goal/repositories/tasksRepository";

export async function getTasksAction(goalId: string) {
  const user = await getUserFromToken();
  if (!user) throw new Error("Não autorizado.");

  const goal = await getGoalById(goalId);
  if (!goal) throw new Error("Esta meta não existe.");

  const userGoal = await getGoalByUserId(user.id);
  if (!userGoal) throw new Error("Esta meta não pertence ao usuário.");

  const tasks = await getTasks(goalId);
  if (!tasks) return [];
  return tasks;
}
