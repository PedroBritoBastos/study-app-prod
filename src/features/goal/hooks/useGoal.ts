"use client";

import { useState, useEffect } from "react";
import { GoalType } from "@/features/goal/types/Goal";
import { TaskType } from "@/features/goal/types/Task";
import { diffInDays } from "@/src/utilities/dateUtils";

import { getTasksAction } from "@/features/goal/actions/tasks/getTasks";
import { getGoalDeadlineAction } from "@/features/goal/actions/goals/getGoalDeadline";

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
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [deadline, setDeadline] = useState("");

  // fetch deadline
  useEffect(() => {
    async function fetchDeadline() {
      const response = await getGoalDeadlineAction(goal.id);
      const isoDate = new Date(response.deadline).toISOString().split("T")[0];
      setDeadline(isoDate);
    }
    fetchDeadline();
  }, [updatedDeadline, goal.id]);

  // fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      const goalTasks = await getTasksAction(goal.id);
      setTasks(goalTasks);
    }
    fetchTasks();
  }, [checkedTask, refresh, goal.id]);

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
