"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { ScheduleType } from "@/features/schedule/types/Schedule";
import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";
import { getScheduleById } from "@/features/schedule/repositories/scheduleRepository";
import { getScheduleTasksByScheduleId } from "@/features/schedule/repositories/scheduleTaskRepository";

export async function getScheduleByIdAction(scheduleId: string): Promise<{
  schedule: ScheduleType;
  currentScheduleTasks: ScheduleTaskType[];
}> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const schedule = await getScheduleById(scheduleId);
  const currentScheduleTasks = await getScheduleTasksByScheduleId(scheduleId);

  return { schedule, currentScheduleTasks };
}
