"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { createScheduleTask } from "@/features/schedule/repositories/scheduleTaskRepository";
import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

export async function createScheduleTaskAction(
  scheduleId: string,
  formData: FormData,
): Promise<ScheduleTaskType> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const title = formData.get("title") as string;
  const executionTime = formData.get("executionTime") as string;

  const scheduleTask = await createScheduleTask(
    scheduleId,
    title,
    executionTime,
    user.id,
  );
  return scheduleTask;
}
