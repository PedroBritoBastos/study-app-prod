import { useState } from "react";
import { GoalType } from "@/features/goal/types/Goal";

export function useGoalsClient() {
  // meta selecionada
  const [selectedGoal, setSelectedGoal] = useState<GoalType>({
    id: "",
    title: "",
    userId: "",
    tasks: [],
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

  function selectGoal(goal: GoalType): void {
    setSelectedGoal(goal);
  }

  function refreshGoal(taskId: string, action: string): void {
    setRefresh({ taskId, action });
  }

  function updateCheckedTask(taskId: string, isChecked: boolean): void {
    setCheckedTask({ taskId, isChecked });
  }

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
