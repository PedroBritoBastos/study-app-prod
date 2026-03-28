"use client";

import { createContext } from "react";
import { useState } from "react";

import { SchedulesDataType } from "../types/GlobalScheduleData";

type ContextType = {
   globalSchedulesData: SchedulesDataType[];
   filterMode: boolean;
   filteredGlobalSchedulesData: SchedulesDataType[];
   calendarViewMode: boolean;
   updateGlobalSchedulesData: (schedulesData: SchedulesDataType[]) => void;
   removeScheduleFromGlobalSchedulesData: (scheduleId: string) => void;
   addScheduleToGlobalSchedulesData: (scheduleData: SchedulesDataType) => void;
   enableFilterMode: () => void;
   disableFilterMode: () => void;
   updateFilteredGlobalSchedulesData: (filtered: SchedulesDataType[]) => void;
   toggleCalendarViewMode: () => void;
};

export const ScheduleContext = createContext<ContextType | null>(null);

export function ScheduleContextProvider({ children }: { children: React.ReactNode }) {

   // estado global
   const [globalSchedulesData, setGlobalSchedulesData] = useState<SchedulesDataType[]>([]);

   // filtragem
   const [filterMode, setFilterMode] = useState<boolean>(false);
   const [filteredGlobalSchedulesData, setFilteredSchedulesData] = useState<SchedulesDataType[]>([]);

   // visualizacao de calendario
   const [calendarViewMode, setCalendarViewMode] = useState<boolean>(false);

   // atualiza o estado global
   function updateGlobalSchedulesData(schedulesData: SchedulesDataType[]): void {
      setGlobalSchedulesData(schedulesData);
   }

   // remove uma schedule do estado global
   function removeScheduleFromGlobalSchedulesData(scheduleId: string): void {
      setGlobalSchedulesData((prev) => {
         const schedules = prev.filter((schedule) => schedule.schedule.id !== scheduleId)
         return schedules;
      })
   }

   // adiciona uma schedule ao estado global
   function addScheduleToGlobalSchedulesData(scheduleData: SchedulesDataType): void {
      setGlobalSchedulesData(prev => [...prev, scheduleData]);
   }

   function enableFilterMode(): void {
      setFilterMode(true);
   }

   function disableFilterMode(): void {
      setFilterMode(false);
   }

   function updateFilteredGlobalSchedulesData(filtered: SchedulesDataType[]): void {
      setFilteredSchedulesData(filtered);
   }

   function toggleCalendarViewMode(): void {
      setCalendarViewMode(prev => !prev);
   }

   return (
      <ScheduleContext.Provider value={{
         globalSchedulesData,
         filterMode,
         filteredGlobalSchedulesData,
         calendarViewMode,
         updateGlobalSchedulesData,
         removeScheduleFromGlobalSchedulesData,
         addScheduleToGlobalSchedulesData,
         enableFilterMode,
         disableFilterMode,
         updateFilteredGlobalSchedulesData,
         toggleCalendarViewMode
      }}>
         {children}
      </ScheduleContext.Provider>
   );
}

