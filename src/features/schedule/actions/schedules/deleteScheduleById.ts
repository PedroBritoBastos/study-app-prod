"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { deleteScheduleTasksByScheduleId } from "@/features/schedule/repositories/scheduleTaskRepository";
import { deleteScheduleById } from "@/features/schedule/repositories/scheduleRepository";

export async function deleteScheduleByIdAction(
  scheduleId: string,
): Promise<void> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  await deleteScheduleTasksByScheduleId(scheduleId);
  await deleteScheduleById(scheduleId);
}
