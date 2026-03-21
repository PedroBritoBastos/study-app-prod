"use client"

import { styles } from "@/styles/goals/goalsClient.styles";
import scrollStyles from "@/src/styles/sidebar/scroll.module.css";

import { Box, Heading, Grid } from "@chakra-ui/react";
import { CreateGoalButton } from "@/features/goal/components/CreateGoalButton";
import { Goal } from "@/features/goal/components/Goal";
import { GoalsSidebar } from "@/features/goal/components/GoalSidebar";

import { GoalType } from "@/features/goal/types/Goal";

import { useSidebar } from "@/src/hooks/useSidebar";
import { useGoalsClient } from "@/features/goal/hooks/useGoalsClient";
import { Backdrop } from "@/src/components/ui/backdrop/Backdrop";

type GoalsClientProps = {
   goalsProp: GoalType[]
}

export function GoalsClient({
   goalsProp
}: GoalsClientProps) {

   const { openSidebar, closeSidebar, isSidebarOpen } = useSidebar();

   const {
      selectedGoal,
      selectGoal,
      updateDeadlineState,
      updatedDeadline,
      goals
   } = useGoalsClient(goalsProp);

   return (
      <Box {...styles.container}>
         <Heading {...styles.heading}>Minhas metas</Heading>

         {/* grid de metas */}
         <Grid {...styles.grid} className={scrollStyles["scrollbar"]}>
            {goals.map((goal) => (
               <Goal
                  key={goal.id}
                  goal={goal}
                  selectGoal={selectGoal}
                  openSidebar={openSidebar}
                  updatedDeadline={updatedDeadline}
               />
            ))}
            <CreateGoalButton />
         </Grid>

         <Backdrop
            isOpen={isSidebarOpen}
            onClick={closeSidebar}
         />

         <GoalsSidebar
            closeSidebar={closeSidebar}
            goal={selectedGoal}
            updateDeadlineState={updateDeadlineState}
            isSidebarOpen={isSidebarOpen}
         />
      </Box>
   )
}