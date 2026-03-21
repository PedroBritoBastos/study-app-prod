"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { GoalType } from "@/features/goal/types/Goal";
import { TaskType } from "@/features/goal/types/Task";

import { getTasksAction } from "@/features/goal/actions/tasks/getTasks";
import { createTaskAction } from "@/features/goal/actions/tasks/createTask";

import { useGoalContext } from "./useGoalContext";

interface UseGoalsSidebarProps {
  closeSidebar: () => void;
  goal: GoalType;
  updateCheckedTask: (taskId: string, isChecked: boolean) => void;
}

export function useGoalsSidebar({
  closeSidebar,
  goal,
  updateCheckedTask,
}: UseGoalsSidebarProps) {
  const router = useRouter();

  // recuperando estados do context
  const { selectedGoalTasks } = useGoalContext();

  const [addedTask, setAddedTask] = useState({});
  const [deletedTask, setDeletedTask] = useState({});
  const [checkedTask, setCheckedTask] = useState<{
    taskId: string;
    isChecked: boolean;
  } | null>(null);

  function handleCheckedTask(taskId: string, isChecked: boolean) {
    setCheckedTask({ taskId, isChecked });
    updateCheckedTask(taskId, isChecked);
  }

  function updateDeletedTask(taskId: string) {
    setDeletedTask(taskId);
  }

  const allTasks = selectedGoalTasks.length;
  const checkedTasks = selectedGoalTasks.filter(
    (task) => task.isChecked,
  ).length;

  return {
    handleCheckedTask,
    updateDeletedTask,
    allTasks,
    checkedTasks,
    selectedGoalTasks,
  };
}
