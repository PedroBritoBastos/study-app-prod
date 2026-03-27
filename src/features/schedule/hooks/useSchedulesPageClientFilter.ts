"use client";

import { SchedulesDataType } from "@/features/schedule/types/GlobalScheduleData";
import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";
import { useState } from "react";

export function useSchedulesPageClientFilter(serverData: SchedulesDataType[]) {
  const {
    updateGlobalSchedulesData,
    globalSchedulesData,
    enableFilterMode,
    disableFilterMode,
  } = useScheduleContext();

  const [openMonthInput, setOpenMonthInput] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [inputDate, setInputDate] = useState("");

  function filterByMonth(month: string, year: string): void {
    enableFilterMode();

    const monthsMap: Record<string, number> = {
      janeiro: 0,
      fevereiro: 1,
      março: 2,
      marco: 2,
      abril: 3,
      maio: 4,
      junho: 5,
      julho: 6,
      agosto: 7,
      setembro: 8,
      outubro: 9,
      novembro: 10,
      dezembro: 11,
    };

    const monthIndex = monthsMap[month.toLowerCase()];

    const filtered = globalSchedulesData.filter((item) => {
      const date = new Date(item.schedule.scheduleDay);

      return (
        date.getMonth() === monthIndex && date.getFullYear() === Number(year)
      );
    });

    updateGlobalSchedulesData(filtered);
  }

  function filterByDate(date: string): void {
    const targetDate = new Date(date);

    const filtered = globalSchedulesData.filter((item) => {
      const scheduleDate = new Date(item.schedule.scheduleDay);

      return (
        scheduleDate.getFullYear() === targetDate.getFullYear() &&
        scheduleDate.getMonth() === targetDate.getMonth() &&
        scheduleDate.getDate() === targetDate.getDate()
      );
    });

    updateGlobalSchedulesData(filtered.length > 0 ? filtered : []);
  }

  function handleFilter(details: { value: string[] }): void {
    setOpenMonthInput(false);
    setMonth("");

    switch (details.value[0]) {
      case "all":
        updateGlobalSchedulesData(serverData);
        break;
      case "month":
        setOpenMonthInput(true);
        break;
      case "date":
        break;
    }
  }

  function handleSelectMonth(details: { value: string[] }): void {
    setMonth(details.value[0]);
  }

  function handleNextYear() {
    setYear((prev) => prev + 1);
  }

  function handlePrevYear() {
    setYear((prev) => prev - 1);
  }

  return {
    handleFilter,
    handleSelectMonth,
    handlePrevYear,
    handleNextYear,
    openMonthInput,
    year,
  };
}
