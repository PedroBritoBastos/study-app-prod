"use client";

import { useState } from "react";

import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

import { deleteScheduleByIdAction } from "@/features/schedule/actions/scheduleTasks/deleteScheduleTaskById";

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

  function sortScheduleTasksByExecutionTime(tasks: ScheduleTaskType[]) {
    return [...tasks].sort((a, b) => {
      const [hourA, minA] = a.executionTime.split(":").map(Number);
      const [hourB, minB] = b.executionTime.split(":").map(Number);

      const totalA = hourA * 60 + minA;
      const totalB = hourB * 60 + minB;

      return totalA - totalB;
    });
  }

  return {
    scheduleTasks,
    handleDeleteTask,
    handleAddScheduleTask,
  };
}
