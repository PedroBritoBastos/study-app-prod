"use client";

import { createContext } from "react";
import { useState } from "react";

type ContextType = {};

export const ScheduleContext = createContext<ContextType | null>(null);

export function ScheduleContextProvider({ children }: { children: React.ReactNode }) {
   return (
      <ScheduleContext.Provider value={{
      }}>
         {children}
      </ScheduleContext.Provider>
   );
}

