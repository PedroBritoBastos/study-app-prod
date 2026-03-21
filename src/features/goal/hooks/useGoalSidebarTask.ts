"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { TaskType } from "@/features/goal/types/Task";

import { deleteTaskAction } from "@/features/goal/actions/tasks/deleteTask";
import { toggleTaskCheckedStatusAction } from "@/features/goal/actions/tasks/toggleCheckedTaskStatus";
import { getTaskStatusAction } from "@/features/goal/actions/tasks/getTaskStatus";

import { useGoalContext } from "./useGoalContext";

type UseGoalSidebarTaskProps = {
  task: TaskType;
  updateDeletedTask: (deletedTaskId: string) => void;
  refreshGoal: (taskId: string, action: string) => void;
};

export function useGoalSidebarTask({
  task,
  updateDeletedTask,
  refreshGoal,
}: UseGoalSidebarTaskProps) {
  const [checked, setChecked] = useState(false);
  const [checkedTask, setCheckedTask] = useState(false);

  // dados do context
  const { selectedGoalTasks, updateSelectedGoalTasks } = useGoalContext();

  const router = useRouter();

  async function handleDeleteTask() {
    const deletedTaskId = await deleteTaskAction(task.id);
    updateDeletedTask(deletedTaskId);
    refreshGoal(deletedTaskId, "delete");
    router.refresh();
  }

  // refatorado
  // atualiza o status da task
  // atualiza state selectedGoalTasks
  // faz o goal correspondente ao goalId selecionado re-renderizar
  async function handleCheckTask() {
    try {
      const newCheckedStatus = toggleTaskCheckedStatusAction(task.id);
      setChecked((prev) => !prev);

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
