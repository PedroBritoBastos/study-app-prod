"use client";

import { useState } from "react";

import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

import { deleteScheduleByIdAction } from "@/features/schedule/actions/scheduleTasks/deleteScheduleTaskById";

import { sortScheduleTasksByExecutionTime } from "@/features/schedule/utils/sortScheduleTasks";

export function useSchedulePageTasks(currentScheduleTasks: ScheduleTaskType[]) {
  // state para guardar as tasks que vao ser exibidas
  const [scheduleTasks, setScheduleTasks] = useState<ScheduleTaskType[]>(
    sortScheduleTasksByExecutionTime(currentScheduleTasks),
  );

  async function handleDeleteTask(taskId: string) {
    try {
      await deleteScheduleByIdAction(taskId);

      setScheduleTasks((prev) => {
        const newState = prev.filter((task) => task.id !== taskId);
        return sortScheduleTasksByExecutionTime(newState);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddScheduleTask(scheduleTask: ScheduleTaskType) {
    setScheduleTasks((prev) =>
      sortScheduleTasksByExecutionTime([...prev, scheduleTask]),
    );
  }

  return {
    scheduleTasks,
    handleDeleteTask,
    handleAddScheduleTask,
  };
}
