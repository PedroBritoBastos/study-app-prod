import { useState, useEffect } from "react";
import { getGoalDeadlineAction } from "@/features/goal/actions/goals/getGoalDeadline";
import { updateDeadlineAction } from "@/features/goal/actions/goals/updateDeadline";

type UseDatePickerProps = {
  goalId: string;
  updateDeadlineState: (goalId: string, newDeadline: string) => void;
};

export function useDatePicker({
  goalId,
  updateDeadlineState,
}: UseDatePickerProps) {
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    async function fetchDeadline() {
      const response = await getGoalDeadlineAction(goalId);

      const isoDate = new Date(response.deadline).toISOString().split("T")[0];

      setDeadline(isoDate);
    }

    fetchDeadline();
  }, [goalId]);

  async function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (newDate < today) {
      setDeadline(today);
      return;
    }

    await updateDeadlineAction(goalId, newDate);
    updateDeadlineState(goalId, newDate);
    setDeadline(newDate);
  }

  return {
    deadline,
    handleDateChange,
  };
}
