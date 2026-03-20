"use client";

import { useState, useEffect } from "react";
import { GoalType } from "@/features/goal/types/Goal";
import { TaskType } from "@/features/goal/types/Task";
import { diffInDays } from "@/src/utilities/dateUtils";

import { getGoalDeadlineAction } from "@/features/goal/actions/goals/getGoalDeadline";
import { useGoalContext } from "./useGoalContext";

type UseGoalProps = {
  goal: GoalType;
  checkedTask: { taskId: string; isChecked: boolean };
  refresh: { taskId: string; action: string };
  updatedDeadline: { goalId: string; newDeadline: string };
};

export function useGoal({
  goal,
  checkedTask,
  refresh,
  updatedDeadline,
}: UseGoalProps) {
  // recuperando dados do context
  const { setTasksAction, tasks } = useGoalContext();

  const [deadline, setDeadline] = useState("");

  // fetch tasks -> context
  // faz fetch na primeira vez que o componente é renderizado
  useEffect(() => {
    async function fetchTasks() {
      await setTasksAction(goal.id);
    }
    fetchTasks();
  }, []);

  // fetch deadline
  useEffect(() => {
    async function fetchDeadline() {
      const response = await getGoalDeadlineAction(goal.id);
      const isoDate = new Date(response.deadline).toISOString().split("T")[0];
      setDeadline(isoDate);
    }
    fetchDeadline();
  }, [updatedDeadline, goal.id]);

  const allTasks = tasks;
  const checkedTasks = tasks.filter((task) => task.isChecked).length;

  const visibleTasks = tasks.slice(0, 3);
  const remainingTasks = tasks.length - 3;

  const daysRemaining = diffInDays(
    new Date().toISOString().split("T")[0],
    deadline,
  );

  return {
    tasks,
    deadline,
    allTasks,
    checkedTasks,
    visibleTasks,
    remainingTasks,
    daysRemaining,
  };
}
