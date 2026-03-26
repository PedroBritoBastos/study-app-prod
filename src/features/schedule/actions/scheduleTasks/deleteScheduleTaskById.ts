"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { deleteScheduleTaskById } from "@/features/schedule/repositories/scheduleTaskRepository";

export async function deleteScheduleByIdAction(taskId: string): Promise<void> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  await deleteScheduleTaskById(taskId);
}
