"use client";

import { useState, useEffect } from "react";
import { GoalType } from "@/features/goal/types/Goal";
import { TaskType } from "@/features/goal/types/Task";
import { diffInDays } from "@/src/utilities/dateUtils";

import { getGoalDeadlineAction } from "@/features/goal/actions/goals/getGoalDeadline";
import { getTasksAction } from "../actions/tasks/getTasks";

import { useGoalContext } from "./useGoalContext";

type UseGoalProps = {
  goal: GoalType;
  updatedDeadline: { goalId: string; newDeadline: string };
};

export function useGoal({ goal, updatedDeadline }: UseGoalProps) {
  // state de tasks
  const [tasks, setTasks] = useState<TaskType[]>([]);

  // loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // dados do context
  const { selectedGoalTasks, selectedGoalId } = useGoalContext();

  const [deadline, setDeadline] = useState("");

  // fetch tasks
  // faz fetch na primeira vez que o componente é renderizado
  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      try {
        const tasks = await getTasksAction(goal.id);
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  // refatorado
  // atualiza apenas o goal selecionado (pelo id) quando tasks sao adicionadas ou removidas
  useEffect(() => {
    function updateTasksState() {
      setTasks(selectedGoalTasks);
    }
    if (selectedGoalId === goal.id) {
      updateTasksState();
    }
  }, [selectedGoalTasks]);

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
    isLoading,
  };
}
