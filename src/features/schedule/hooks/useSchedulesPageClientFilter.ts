"use client";

import { SchedulesDataType } from "@/features/schedule/types/GlobalScheduleData";
import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { formatToYearMonthDay } from "@/src/utilities/dateUtils";

export function useSchedulesPageClientFilter(serverData: SchedulesDataType[]) {
  const router = useRouter();

  const {
    updateFilteredGlobalSchedulesData,
    globalSchedulesData,
    filterMode,
    enableFilterMode,
    disableFilterMode,
    calendarViewMode,
  } = useScheduleContext();

  const [openMonthInput, setOpenMonthInput] = useState(false);
  const [openDateInput, setOpenDateInput] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState("");
  const [all, setAll] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>(["none"]);

  function filterByMonth(month: string, year: number): SchedulesDataType[] {
    const monthsMap: Record<string, string> = {
      janeiro: "01",
      fevereiro: "02",
      março: "03",
      abril: "04",
      maio: "05",
      junho: "06",
      julho: "07",
      agosto: "08",
      setembro: "09",
      outubro: "10",
      novembro: "11",
      dezembro: "12",
    };

    const monthIndex = monthsMap[month.toLowerCase()];
    const yearString = String(year);

    const filtered = globalSchedulesData.filter((item) => {
      const [itemYear, itemMonth] = item.schedule.scheduleDay.split("-");

      return itemYear === yearString && itemMonth === monthIndex;
    });

    return filtered;
  }

  function filterByDate(date: string): SchedulesDataType[] {
    const filtered = globalSchedulesData.filter((item) => {
      if (item.schedule.scheduleDay === date) return item;
    });

    return filtered;
  }

  // filtra os meses de acordo com a option selecionada
  function handleFilter(details: { value: string[] }): void {
    updateFilteredGlobalSchedulesData([]);
    setOpenMonthInput(false);
    setOpenDateInput(false);
    setAll(false);
    setMonth("");
    setDate("");

    switch (details.value[0]) {
      case "none":
        disableFilterMode();
        setSelectedFilter(details.value);
        break;
      case "month":
        enableFilterMode();
        setOpenMonthInput(true);
        setSelectedFilter(details.value);
        break;
      case "date":
        enableFilterMode();
        setOpenDateInput(true);
        setSelectedFilter(details.value);
        break;
      case "all":
        enableFilterMode();
        updateFilteredGlobalSchedulesData(globalSchedulesData);
        setSelectedFilter(details.value);
        setAll(true);
        break;
    }
  }

  useEffect(() => {
    if (all) {
      updateFilteredGlobalSchedulesData(globalSchedulesData);
    }
  }, [globalSchedulesData]);

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
      console.log(filterByDate(date));
      updateFilteredGlobalSchedulesData(filterByDate(date));
    }
  }, [date]);

  useEffect(() => {
    if (calendarViewMode) {
      setSelectedFilter(["none"]);
      setOpenDateInput(false);
      setOpenMonthInput(false);
      setAll(false);
      setMonth("");
      setDate("");
      updateFilteredGlobalSchedulesData([]);
    }
  }, [calendarViewMode]);

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
    selectedFilter,
  };
}
