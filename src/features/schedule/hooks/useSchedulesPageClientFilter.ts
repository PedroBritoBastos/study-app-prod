"use client";

import { SchedulesDataType } from "@/features/schedule/types/GlobalScheduleData";
import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";

export function useSchedulesPageClientFilter(serverData: SchedulesDataType[]) {
  const { updateGlobalSchedulesData, globalSchedulesData } =
    useScheduleContext();

  function handleFilter(details: { value: string[] }): void {
    console.log(details.value[0]);
  }

  return {
    handleFilter,
  };
}
