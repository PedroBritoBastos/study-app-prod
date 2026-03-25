import { ScheduleType } from "./Schedule";
import { ScheduleTaskType } from "./ScheduleTask";

export type SchedulesDataType = {
  schedule: ScheduleType;
  currentScheduleTasks: ScheduleTaskType[];
};
