"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import {
  getTaskById,
  toggleTaskCheckedStatus,
} from "@/features/goal/repositories/tasksRepository";
import { revalidatePath } from "next/cache";

export async function toggleTaskCheckedStatusAction(taskId: string) {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) throw new Error("Não autorizado");

  const task = await getTaskById(taskId);
  if (!task) throw new Error("Essa tarefa não existe.");

  await toggleTaskCheckedStatus(taskId);
  revalidatePath("/goals");
}
