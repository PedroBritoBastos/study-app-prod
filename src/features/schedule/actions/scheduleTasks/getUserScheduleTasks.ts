"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";
import { getUserScheduleTasks } from "@/features/schedule/repositories/scheduleTaskRepository";

export async function getUserScheduleTasksAction(): Promise<
  ScheduleTaskType[]
> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const scheduleTasks = await getUserScheduleTasks(user.id);
  return scheduleTasks;
}
