"use server"

import { styles } from "@/styles/goals/goalsPage.styles";

import { Navbar } from "@/src/components/ui/navbar/Navbar";
import { Flex } from "@chakra-ui/react"
import { GoalsClient } from "@/src/features/goal/components/GoalsClient";

import { getUserGoalsAction } from "@/src/features/goal/actions/getUserGoals";

import { GoalType } from "@/src/features/goal/types/Goal";


export default async function GoalsPage() {
   const goals: GoalType[] = await getUserGoalsAction();

   return (
      <Flex {...styles.container}>
         <Navbar />
         <GoalsClient goals={goals} />
      </Flex>
   )
}