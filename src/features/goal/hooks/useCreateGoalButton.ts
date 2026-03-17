"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createGoalAction } from "@/features/goal/actions/createGoal";

export function useCreateGoalButton() {
  const [createMode, setCreateMode] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const router = useRouter();

  async function handleCreate(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    // criando formData
    const formData = new FormData();
    formData.append("title", goalTitle);
    formData.append("deadline", deadline);

    try {
      await createGoalAction(formData);
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
