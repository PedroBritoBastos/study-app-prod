"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { ScheduleType } from "@/features/schedule/types/Schedule";
import { getUserSchedules } from "@/features/schedule/repositories/scheduleRepository";

export async function getUserSchedulesAction(): Promise<ScheduleType[]> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const schedules = await getUserSchedules(user.id);
  return schedules;
}
