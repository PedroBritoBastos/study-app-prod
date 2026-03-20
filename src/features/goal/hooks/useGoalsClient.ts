"use client";

import { useState } from "react";
import { GoalType } from "@/features/goal/types/Goal";

export function useGoalsClient() {
  // meta selecionada
  const [selectedGoal, setSelectedGoal] = useState<GoalType>({
    id: "",
    title: "",
    userId: "",
    deadline: new Date(),
  });

  // monitora quando uma task é checada
  const [checkedTask, setCheckedTask] = useState({
    taskId: "",
    isChecked: false,
  });

  // monitora quando uma task é criada/deletada
  const [refresh, setRefresh] = useState({
    taskId: "",
    action: "",
  });

  // monitora quando a deadline é atualizada
  const [updatedDeadline, setUpdatedDeadline] = useState({
    goalId: "",
    newDeadline: "",
  });

  // seleciona a meta
  function selectGoal(goal: GoalType): void {
    setSelectedGoal(goal);
  }

  // atualiza a meta quando uma task é adicionada ou excluida
  function refreshGoal(taskId: string, action: string): void {
    setRefresh({ taskId, action });
  }

  // atualiza a meta quando uma task é marcada
  function updateCheckedTask(taskId: string, isChecked: boolean): void {
    setCheckedTask({ taskId, isChecked });
  }

  // atualiza o prazo da meta
  function updateDeadlineState(goalId: string, newDeadline: string): void {
    setUpdatedDeadline({ goalId, newDeadline });
  }

  return {
    selectedGoal,
    selectGoal,
    refreshGoal,
    updateCheckedTask,
    updateDeadlineState,
    checkedTask,
    refresh,
    updatedDeadline,
  };
}
