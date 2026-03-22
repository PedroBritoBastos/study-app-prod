"use client";

import { useState } from "react";

import { TaskType } from "@/features/goal/types/Task";

import { deleteTaskAction } from "@/features/goal/actions/tasks/deleteTask";
import { toggleTaskCheckedStatusAction } from "@/features/goal/actions/tasks/toggleCheckedTaskStatus";

import { useGoalContext } from "./useGoalContext";

type UseGoalSidebarTaskProps = {
  task: TaskType;
};

export function useGoalSidebarTask({ task }: UseGoalSidebarTaskProps) {
  // dados do context
  const { selectedGoalTasks, updateSelectedGoalTasks } = useGoalContext();

  // refatorado
  // exclui uma tarefa do banco
  // exclui a tarefa com o id excluido e atualiza o estado global
  // faz o goal correspondente ao goalId selecionado re-renderizar
  async function handleDeleteTask() {
    try {
      const deletedTaskId = await deleteTaskAction(task.id);

      // atualizando o estado global de tasks
      const updatedTasks = selectedGoalTasks.filter((t) => t.id !== task.id);
      updateSelectedGoalTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  }

  // refatorado
  // atualiza o status da task
  // atualiza state selectedGoalTasks
  // faz o goal correspondente ao goalId selecionado re-renderizar
  async function handleCheckTask() {
    try {
      const newCheckedStatus = await toggleTaskCheckedStatusAction(task.id);

      // atualizando a task no estado global
      const updatedTasks = selectedGoalTasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...t,
            isChecked: !t.isChecked,
          };
        }
        return t;
      });
      updateSelectedGoalTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    handleDeleteTask,
    handleCheckTask,
  };
}
