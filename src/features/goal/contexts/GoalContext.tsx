"use client";

import { createContext } from "react";
import { useEffect, useState } from "react";
import { TaskType } from "@/features/goal/types/Task";
import { getTasksAction } from "@/features/goal/actions/tasks/getTasks";

type ContextType = {
   setTasksAction: (goalId: string) => Promise<void>;
   tasks: TaskType[];
};

export const GoalContext = createContext<ContextType | null>(null);

export function GoalContextProvider({ children }: { children: React.ReactNode }) {

   // estados globais compartilhados entre Goal e GoalSidebar
   const [tasks, setTasks] = useState<TaskType[]>([]);

   // atualiza estado global de tasks -> vai ser usado pelo Goal
   async function setTasksAction(goalId: string): Promise<void> {
      const tasks = await getTasksAction(goalId);
      setTasks(tasks);
   }

   return (
      <GoalContext.Provider value={{
         setTasksAction,
         tasks
      }}>
         {children}
      </GoalContext.Provider>
   );
}

