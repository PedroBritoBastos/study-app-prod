"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { ScheduleType } from "@/features/schedule/types/Schedule";
import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";
import { createSchedule } from "@/features/schedule/repositories/scheduleRepository";
import { createScheduleTasks } from "@/features/schedule/repositories/scheduleTaskRepository";
import { CreateScheduleActionReturn } from "../../types/scheduleActions/CreateScheduleActionReturn";

export async function createScheduleAction(
  formData: FormData,
): Promise<CreateScheduleActionReturn> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const rawDate = formData.get("scheduleDay") as string;

  const [year, month, day] = rawDate.split("-").map(Number);
  const scheduleDay = new Date(year, month - 1, day);

  const tasks = JSON.parse(formData.get("tasks") as string) as {
    title: string;
    executionTime: string;
  }[];

  const createdSchedule: ScheduleType = await createSchedule(
    scheduleDay,
    user.id,
  );

  const createdTasks: ScheduleTaskType[] = await createScheduleTasks(
    tasks,
    createdSchedule.id,
    user.id,
  );

  return { createdSchedule, createdTasks };
}
