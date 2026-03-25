"use client";

import { useState, useEffect } from "react";
import { getDaysOfMonth, formatDate } from "@/src/utilities/dateUtils";

import { MouseEvent } from "react";
import { SchedulesDataType } from "../types/GlobalScheduleData";

import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";

export function useSchedulesPageClient(serverData: SchedulesDataType[]) {
  const { globalSchedulesData, updateGlobalSchedulesData } =
    useScheduleContext();

  // data atual
  const [currentDate, setCurrentDate] = useState(new Date());

  // atualiza o estado global
  useEffect(() => {
    updateGlobalSchedulesData(serverData);
  }, []);

  // dia, ano e mes que será apresentado na coluna
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();
  const monthName: string = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  }).format(currentDate);

  const monthDays: Date[] = getDaysOfMonth(year, month);

  function handleNextMonth(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }

  function handlePreviousMonth(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }

  return {
    year,
    monthName,
    monthDays,
    globalSchedulesData,
    handleNextMonth,
    handlePreviousMonth,
  };
}
