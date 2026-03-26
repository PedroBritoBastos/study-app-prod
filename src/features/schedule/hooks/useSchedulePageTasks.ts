"use client";

import { useState } from "react";

import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

import { deleteScheduleByIdAction } from "@/features/schedule/actions/scheduleTasks/deleteScheduleTaskById";

export function useSchedulePageTasks(currentScheduleTasks: ScheduleTaskType[]) {
  // state para guardar as tasks que vao ser exibidas
  const [scheduleTasks, setScheduleTasks] =
    useState<ScheduleTaskType[]>(currentScheduleTasks);

  async function handleDeleteTask(taskId: string) {
    try {
      await deleteScheduleByIdAction(taskId);

      setScheduleTasks((prev) => {
        const newState = prev.filter((task) => task.id !== taskId);
        return newState;
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddScheduleTask(scheduleTask: ScheduleTaskType) {
    setScheduleTasks((prev) => [...prev, scheduleTask]);
  }

  return {
    scheduleTasks,
    handleDeleteTask,
    handleAddScheduleTask,
  };
}
