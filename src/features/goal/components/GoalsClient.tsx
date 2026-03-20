"use client"

import { styles } from "@/styles/goals/goalsClient.styles";
import scrollStyles from "@/src/styles/sidebar/scroll.module.css";

import { Box, Heading, Grid } from "@chakra-ui/react";
import { CreateGoalButton } from "@/features/goal/components/CreateGoalButton";
import { Goal } from "@/features/goal/components/Goal";

import { GoalType } from "@/features/goal/types/Goal";

import { useSidebar } from "@/src/hooks/useSidebar";
import { useGoalsClient } from "@/features/goal/hooks/useGoalsClient";

type GoalsClientProps = {
   goals: GoalType[]
}

export function GoalsClient({
   goals
}: GoalsClientProps) {

   const { openSidebar, closeSidebar, isSidebarOpen } = useSidebar();

   const {
      selectedGoal,
      selectGoal,
      refreshGoal,
      updateCheckedTask,
      updateDeadlineState,
      checkedTask,
      refresh,
      updatedDeadline,
   } = useGoalsClient();

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
                  checkedTask={checkedTask}
                  refresh={refresh}
                  updatedDeadline={updatedDeadline}
               />
            ))}
            <CreateGoalButton />
         </Grid>
      </Box>
   )
}