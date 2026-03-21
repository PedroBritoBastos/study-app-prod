"use client";

import { useState, useEffect } from "react";
import { GoalType } from "@/features/goal/types/Goal";

import { useGoalContext } from "./useGoalContext";

export function useGoalsClient(goalsProp: GoalType[]) {
  // dados do context
  const { updateGlobalGoalsState, goals } = useGoalContext();

  // refatorado
  // salva os dados vindo do server component no estado global quando renderizado pela primeira vez
  useEffect(() => {
    updateGlobalGoalsState(goalsProp);
  }, []);

  // meta selecionada
  const [selectedGoal, setSelectedGoal] = useState<GoalType>({
    id: "",
    title: "",
    userId: "",
    deadline: new Date(),
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

  // atualiza o prazo da meta
  function updateDeadlineState(goalId: string, newDeadline: string): void {
    setUpdatedDeadline({ goalId, newDeadline });
  }

  return {
    selectedGoal,
    selectGoal,
    updateDeadlineState,
    updatedDeadline,
    goals,
  };
}
