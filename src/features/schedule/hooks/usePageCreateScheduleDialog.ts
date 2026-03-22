"use client";

import { MouseEvent, ChangeEvent, useState } from "react";

export function usePageCreateScheduleDialog() {
  const [scheduleDay, setScheduleDay] = useState<string | null>(null);

  function handleScheduleDayInputChange(e: ChangeEvent<HTMLInputElement>) {
    setScheduleDay(e.target.value);
  }

  function handleCreateSchedule(e: MouseEvent<HTMLButtonElement>) {}

  return { scheduleDay, handleScheduleDayInputChange };
}
