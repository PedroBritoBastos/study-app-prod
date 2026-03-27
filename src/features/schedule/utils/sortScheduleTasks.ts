import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

export function sortScheduleTasksByExecutionTime(tasks: ScheduleTaskType[]) {
  return [...tasks].sort((a, b) => {
    const [hourA, minA] = a.executionTime.split(":").map(Number);
    const [hourB, minB] = b.executionTime.split(":").map(Number);

    const totalA = hourA * 60 + minA;
    const totalB = hourB * 60 + minB;

    return totalA - totalB;
  });
}
