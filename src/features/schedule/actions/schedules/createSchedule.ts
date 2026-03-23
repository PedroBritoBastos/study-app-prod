"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { ScheduleType } from "@/features/schedule/types/Schedule";
import { createSchedule } from "@/features/schedule/repositories/scheduleRepository";

export async function createScheduleAction(formData: FormData): ScheduleType {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  // recuperando os dados do FormData
  const scheduleDay = new Date(formData.get("scheduleDay") as string);

  const tasks = JSON.parse(formData.get("tasks") as string) as {
    title: string;
    executionTime: string;
  }[];

  const schedule = await createSchedule(scheduleDay, user.id);

  return {};
}
