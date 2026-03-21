"use client";

import { useGoalContext } from "./useGoalContext";

export function useGoalsSidebar() {
  // recuperando estados do context
  const { selectedGoalTasks } = useGoalContext();

  const allTasks = selectedGoalTasks.length;
  const checkedTasks = selectedGoalTasks.filter(
    (task) => task.isChecked,
  ).length;

  return {
    allTasks,
    checkedTasks,
    selectedGoalTasks,
  };
}
