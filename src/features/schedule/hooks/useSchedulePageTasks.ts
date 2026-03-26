"use client";

import { useState } from "react";

import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

export function useSchedulePageTasks(currentScheduleTasks: ScheduleTaskType[]) {
  // state para guardar as tasks que vao ser exibidas
  const [scheduleTasks, setScheduleTasks] =
    useState<ScheduleTaskType[]>(currentScheduleTasks);

  function handleDeleteTask(taskId: string): void {
    setScheduleTasks((prev) => {
      const newState = prev.filter((task) => task.id !== taskId);
      return newState;
    });
  }

  return {
    scheduleTasks,
    handleDeleteTask,
  };
}
