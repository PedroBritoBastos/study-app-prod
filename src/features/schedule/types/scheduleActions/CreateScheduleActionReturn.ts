import { ScheduleType } from "../Schedule";
import { ScheduleTaskType } from "../ScheduleTask";

export type CreateScheduleActionReturn = {
  createdSchedule: ScheduleType;
  createdTasks: ScheduleTaskType[];
};
