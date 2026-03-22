"use client";

import { useState } from "react";
import { useGoalContext } from "@/features/goal/hooks/useGoalContext";

import { createGoalAction } from "@/src/features/goal/actions/goals/createGoal";

export function useCreateGoalButton() {
  const [createMode, setCreateMode] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  // context
  const { addGoalToGlobalGoalsState } = useGoalContext();

  async function handleCreate(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    // criando formData
    const formData = new FormData();
    formData.append("title", goalTitle);
    formData.append("deadline", deadline);

    try {
      const createdGoal = await createGoalAction(formData);
      addGoalToGlobalGoalsState(createdGoal);
      setGoalTitle("");
      setCreateMode(false);
      setDeadline("");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  function handleCancel(e: React.MouseEvent) {
    e.stopPropagation();
    setCreateMode(false);
    setDeadline("");
  }

  return {
    createMode,
    setCreateMode,
    goalTitle,
    setGoalTitle,
    deadline,
    setDeadline,
    handleCreate,
    handleCancel,
  };
}
