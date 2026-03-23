import { ScheduleModel } from "../models/Schedule";
import { ObjectId } from "mongoose";
import { ScheduleType } from "../types/Schedule";

export async function createSchedule(
  scheduleDay: Date,
  userId: string,
): Promise<ScheduleType> {
  const schedule = await ScheduleModel.create({
    scheduleDay,
    userId,
  });

  const obj = schedule.toObject();

  return {
    id: obj._id.toString(),
    scheduleDay: obj.scheduleDay,
    createdAt: obj.createdAt,
    userId: obj.userId.toString(),
  };
}
