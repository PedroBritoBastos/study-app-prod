"use client";

import { createContext } from "react";
import { useEffect, useState } from "react";
import { TaskType } from "@/features/goal/types/Task";
import { getTasksAction } from "@/features/goal/actions/tasks/getTasks";

type ContextType = {
   setTasksAction: (goalId: string) => Promise<void>;
};

export const GoalContext = createContext<ContextType | null>(null);

export function GoalContextProvider({ children }: { children: React.ReactNode }) {
   /* 
      estados globais compartilhados entre Goal e GoalSidebar
   */
   const [tasks, setTasks] = useState<TaskType[] | null>(null);

   // atualiza estado global de tasks
   async function setTasksAction(goalId: string): Promise<void> {
      const tasks = await getTasksAction(goalId);
      setTasks(tasks);
   }

   return (
      <GoalContext.Provider value={{
         setTasksAction
      }}>
         {children}
      </GoalContext.Provider>
   );
}

