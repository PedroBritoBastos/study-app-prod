import { ScheduleModel } from "../models/Schedule";
import { ScheduleType } from "../types/Schedule";

export async function createSchedule(
  scheduleDay: string,
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

export async function getUserSchedules(
  userId: string,
): Promise<ScheduleType[]> {
  const schedules = await ScheduleModel.find({ userId: userId });

  return schedules.map((schedule) => {
    return {
      id: schedule._id.toString(),
      scheduleDay: schedule.scheduleDay,
      createdAt: schedule.createdAt,
      userId: schedule.userId.toString(),
    };
  });
}

export async function getScheduleById(
  scheduleId: string,
): Promise<ScheduleType> {
  const schedule = await ScheduleModel.findById(scheduleId);

  return {
    id: schedule._id.toString(),
    scheduleDay: schedule.scheduleDay,
    createdAt: schedule.createdAt,
    userId: schedule.userId.toString(),
  };
}

export async function deleteScheduleById(scheduleId: string): Promise<void> {
  await ScheduleModel.findByIdAndDelete(scheduleId);
}
