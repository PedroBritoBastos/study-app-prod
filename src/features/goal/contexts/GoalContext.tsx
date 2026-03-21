"use client";

import { createContext } from "react";
import { useEffect, useState } from "react";
import { TaskType } from "@/features/goal/types/Task";
import { getTasksAction } from "@/features/goal/actions/tasks/getTasks";

type ContextType = {
   selectedGoalTasks: TaskType[];
   selectedGoalId: string;
   updateSelectedGoalTasks: (tasks: TaskType[]) => void;
   updateSelectedGoalId: (goalId: string) => void;
   addTaskToSelectedGoal: (task: TaskType) => void;
};

export const GoalContext = createContext<ContextType | null>(null);

export function GoalContextProvider({ children }: { children: React.ReactNode }) {
   const [selectedGoalTasks, setSelectedGoalTasks] = useState<TaskType[]>([]); // estado global do goal selecionado
   const [selectedGoalId, setSelectedGoalId] = useState<string>(""); // estado global que guarda o id do goal selecionado

   function updateSelectedGoalTasks(tasks: TaskType[]): void {
      setSelectedGoalTasks(tasks);
   }

   function updateSelectedGoalId(goalId: string) {
      setSelectedGoalId(goalId);
   }

   function addTaskToSelectedGoal(task: TaskType) {
      setSelectedGoalTasks((prev) => [...prev, task]);
   }


   return (
      <GoalContext.Provider value={{
         updateSelectedGoalTasks,
         updateSelectedGoalId,
         addTaskToSelectedGoal,
         selectedGoalTasks,
         selectedGoalId,
      }}>
         {children}
      </GoalContext.Provider>
   );
}

