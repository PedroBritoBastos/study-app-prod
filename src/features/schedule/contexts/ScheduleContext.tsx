"use client";

import { createContext } from "react";
import { useState } from "react";

import { SchedulesDataType } from "../types/GlobalScheduleData";

type ContextType = {
   globalSchedulesData: SchedulesDataType[];
   filterMode: boolean;
   updateGlobalSchedulesData: (schedulesData: SchedulesDataType[]) => void;
   removeScheduleFromGlobalSchedulesData: (scheduleId: string) => void;
   addScheduleToGlobalSchedulesData: (scheduleData: SchedulesDataType) => void;
   enableFilterMode: () => void;
   disableFilterMode: () => void;
};

export const ScheduleContext = createContext<ContextType | null>(null);

export function ScheduleContextProvider({ children }: { children: React.ReactNode }) {
   const [globalSchedulesData, setGlobalSchedulesData] = useState<SchedulesDataType[]>([]);
   const [filterMode, setFilterMode] = useState<boolean>(false);

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

   return (
      <ScheduleContext.Provider value={{
         globalSchedulesData,
         filterMode,
         updateGlobalSchedulesData,
         removeScheduleFromGlobalSchedulesData,
         addScheduleToGlobalSchedulesData,
         enableFilterMode,
         disableFilterMode
      }}>
         {children}
      </ScheduleContext.Provider>
   );
}

