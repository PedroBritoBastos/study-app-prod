"use client";

import { createContext } from "react";
import { useState } from "react";

import { SchedulesDataType } from "../types/GlobalScheduleData";

type ContextType = {
   globalSchedulesData: SchedulesDataType[];
   updateGlobalSchedulesData: (schedulesData: SchedulesDataType[]) => void;
   removeScheduleFromGlobalSchedulesData: (scheduleId: string) => void;
};

export const ScheduleContext = createContext<ContextType | null>(null);

export function ScheduleContextProvider({ children }: { children: React.ReactNode }) {
   const [globalSchedulesData, setGlobalSchedulesData] = useState<SchedulesDataType[]>([]);

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

   return (
      <ScheduleContext.Provider value={{
         globalSchedulesData,
         updateGlobalSchedulesData,
         removeScheduleFromGlobalSchedulesData
      }}>
         {children}
      </ScheduleContext.Provider>
   );
}

