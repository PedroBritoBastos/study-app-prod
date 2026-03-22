"use client";

import { useState, useEffect } from "react";
import { GoalType } from "@/features/goal/types/Goal";
import { TaskType } from "@/features/goal/types/Task";
import { diffInDays } from "@/src/utilities/dateUtils";
import { getTasksAction } from "../actions/tasks/getTasks";

import { useGoalContext } from "./useGoalContext";

type UseGoalProps = {
  goal: GoalType;
};

export function useGoal({ goal }: UseGoalProps) {
  // state de tasks
  const [tasks, setTasks] = useState<TaskType[]>([]);

  // loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // state de prazo
  const [deadline, setDeadline] = useState("");

  // dados do context
  const { selectedGoalTasks, selectedGoalId, globalDeadline } =
    useGoalContext();

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

  // refatorado
  // armazena a deadline no estado local assim que o componente é renderizado
  useEffect(() => {
    const formatedDeadline = new Date(goal.deadline)
      .toISOString()
      .split("T")[0];
    setDeadline(formatedDeadline);
  }, []);

  // refatorado
  // atualiza o estado local quando o estado global é atualizado
  useEffect(() => {
    if (selectedGoalId === goal.id) setDeadline(globalDeadline);
  }, [globalDeadline]);

  const allTasks = tasks;
  const checkedTasks = tasks.filter((task) => task.isChecked).length;

  const visibleTasks = tasks.slice(0, 3);
  const remainingTasks = tasks.length - 3;

  // faz a subtração da data de hoje com a data do prazo para retornar os dias restantes
  const daysRemaining = diffInDays(
    new Date().toISOString().split("T")[0],
    deadline,
  );

  return {
    tasks,
    allTasks,
    checkedTasks,
    visibleTasks,
    remainingTasks,
    daysRemaining,
    isLoading,
    deadline,
  };
}
