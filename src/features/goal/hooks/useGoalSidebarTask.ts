"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { TaskType } from "@/features/goal/types/Task";

import { deleteTaskAction } from "@/features/goal/actions/tasks/deleteTask";
import { toggleTaskCheckedStatusAction } from "@/features/goal/actions/tasks/toggleCheckedTaskStatus";
import { getTaskStatusAction } from "@/features/goal/actions/tasks/getTaskStatus";

type UseGoalSidebarTaskProps = {
  task: TaskType;
  updateDeletedTask: (deletedTaskId: string) => void;
  updateCheckedTask: (taskId: string, isChecked: boolean) => void;
  refreshGoal: (taskId: string, action: string) => void;
};

export function useGoalSidebarTask({
  task,
  updateDeletedTask,
  updateCheckedTask,
  refreshGoal,
}: UseGoalSidebarTaskProps) {
  const [checked, setChecked] = useState(false);
  const [checkedTask, setCheckedTask] = useState(false);

  const router = useRouter();

  async function handleDeleteTask() {
    const deletedTaskId = await deleteTaskAction(task.id);
    updateDeletedTask(deletedTaskId);
    refreshGoal(deletedTaskId, "delete");
    router.refresh();
  }

  async function handleCheckTask() {
    const response = await toggleTaskCheckedStatusAction(task.id);
    const newValue = !checked;
    setCheckedTask(!checkedTask);
    updateCheckedTask(task.id, newValue);
  }

  useEffect(() => {
    async function fetchTaskStatus() {
      const status = await getTaskStatusAction(task.id);
      setChecked(status);
    }
    fetchTaskStatus();
  }, [checkedTask]);

  return {
    checked,
    handleDeleteTask,
    handleCheckTask,
  };
}
