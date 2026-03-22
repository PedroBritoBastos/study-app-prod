"use client";

import { useGoalContext } from "./useGoalContext";
import { MouseEvent } from "react";

import { GoalType } from "../types/Goal";

import { deleteGoalByIdAction } from "@/features/goal/actions/goals/deleteGoalById";

export function useGoalsSidebar(goal: GoalType, closeSidebar: () => void) {
  // recuperando estados do context
  const { selectedGoalTasks, goals, updateGlobalGoalsState } = useGoalContext();

  const allTasks = selectedGoalTasks.length;
  const checkedTasks = selectedGoalTasks.filter(
    (task) => task.isChecked,
  ).length;

  async function handleDeleteGoalById(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await deleteGoalByIdAction(goal.id);
      const updatedGlobalGoalsState = goals.filter((g) => g.id !== goal.id);
      updateGlobalGoalsState(updatedGlobalGoalsState);
      closeSidebar();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    allTasks,
    checkedTasks,
    selectedGoalTasks,
    handleDeleteGoalById,
  };
}
