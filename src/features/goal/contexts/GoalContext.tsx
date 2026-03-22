"use client";

import { createContext } from "react";
import { TaskType } from "@/features/goal/types/Task";
import { GoalType } from "@/features/goal/types/Goal";

import { useState } from "react";

type ContextType = {
   selectedGoalTasks: TaskType[];
   selectedGoalId: string;
   goals: GoalType[];
   globalDeadline: string;
   updateSelectedGoalTasks: (tasks: TaskType[]) => void;
   updateSelectedGoalId: (goalId: string) => void;
   addTaskToSelectedGoal: (task: TaskType) => void;
   updateGlobalGoalsState: (goals: GoalType[]) => void;
   addGoalToGlobalGoalsState: (goal: GoalType) => void;
   updateGlobalDeadlineStateWithSelectedGoalDeadline: (selectedGoalDeadline: string) => void
};

export const GoalContext = createContext<ContextType | null>(null);

export function GoalContextProvider({ children }: { children: React.ReactNode }) {
   const [selectedGoalTasks, setSelectedGoalTasks] = useState<TaskType[]>([]); // estado global do goal selecionado
   const [selectedGoalId, setSelectedGoalId] = useState<string>(""); // estado global que guarda o id do goal selecionado
   const [goals, setGoals] = useState<GoalType[]>([]); // estado global com todas as metas vindas da api
   const [globalDeadline, setGlobalDeadline] = useState<string>(""); // estado global para salvar o prazo

   function updateSelectedGoalTasks(tasks: TaskType[]): void {
      setSelectedGoalTasks(tasks);
   }

   function updateSelectedGoalId(goalId: string) {
      setSelectedGoalId(goalId);
   }

   function addTaskToSelectedGoal(task: TaskType) {
      setSelectedGoalTasks((prev) => [...prev, task]);
   }

   function updateGlobalGoalsState(goals: GoalType[]): void {
      setGoals(goals);
   }

   function addGoalToGlobalGoalsState(goal: GoalType): void {
      setGoals(prev => [...prev, goal]);
   }

   function updateGlobalDeadlineStateWithSelectedGoalDeadline(selectedGoalDeadline: string): void {
      setGlobalDeadline(selectedGoalDeadline);
   }

   return (
      <GoalContext.Provider value={{
         updateSelectedGoalTasks,
         updateSelectedGoalId,
         addTaskToSelectedGoal,
         updateGlobalGoalsState,
         addGoalToGlobalGoalsState,
         updateGlobalDeadlineStateWithSelectedGoalDeadline,
         selectedGoalTasks,
         selectedGoalId,
         goals,
         globalDeadline
      }}>
         {children}
      </GoalContext.Provider>
   );
}

