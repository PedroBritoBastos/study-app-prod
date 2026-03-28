"use client";

import { SchedulesDataType } from "@/features/schedule/types/GlobalScheduleData";
import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useSchedulesPageClientFilter(serverData: SchedulesDataType[]) {
  const router = useRouter();

  const {
    updateFilteredGlobalSchedulesData,
    globalSchedulesData,
    filterMode,
    enableFilterMode,
    disableFilterMode,
  } = useScheduleContext();

  const [openMonthInput, setOpenMonthInput] = useState(false);
  const [openDateInput, setOpenDateInput] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState("");

  function filterByMonth(month: string, year: number): SchedulesDataType[] {
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

      return date.getMonth() === monthIndex && date.getFullYear() === year;
    });

    return filtered;
  }

  function filterByDate(date: string): SchedulesDataType[] {
    const targetDate = new Date(date);

    const filtered = globalSchedulesData.filter((item) => {
      const scheduleDate = new Date(item.schedule.scheduleDay);

      return (
        scheduleDate.getFullYear() === targetDate.getFullYear() &&
        scheduleDate.getMonth() === targetDate.getMonth() &&
        scheduleDate.getDate() === targetDate.getDate()
      );
    });

    return filtered;
  }

  // filtra os meses de acordo com a option selecionada
  function handleFilter(details: { value: string[] }): void {
    updateFilteredGlobalSchedulesData([]);
    setOpenMonthInput(false);
    setOpenDateInput(false);
    setMonth("");
    setDate("");

    switch (details.value[0]) {
      case "none":
        disableFilterMode();
        break;
      case "month":
        enableFilterMode();
        setOpenMonthInput(true);
        break;
      case "date":
        enableFilterMode();
        setOpenDateInput(true);
        break;
      case "all":
        enableFilterMode();
        updateFilteredGlobalSchedulesData(globalSchedulesData);
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

  function handleDateInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setDate(e.target.value);
  }

  useEffect(() => {
    disableFilterMode();
  }, []);

  // filtra as schedules de globalSchedulesData toda vez que o mês ou o ano muda
  // filtra as schedules de globalSchedulesData sempre que uma schedula é adicionada ou removida
  useEffect(() => {
    if (filterMode && month) {
      updateFilteredGlobalSchedulesData(filterByMonth(month, year));
    }
  }, [month, year, globalSchedulesData]);

  // filtra as schedules de globalSchedulesData toda vez que a data do input mudar
  useEffect(() => {
    if (filterMode && date) {
      updateFilteredGlobalSchedulesData(filterByDate(date));
    }
  }, [date]);

  return {
    handleFilter,
    handleSelectMonth,
    handlePrevYear,
    handleNextYear,
    handleDateInputChange,
    openMonthInput,
    openDateInput,
    year,
    date,
  };
}
