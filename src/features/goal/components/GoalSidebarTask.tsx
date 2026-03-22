
"use client"

import { Flex, Text, IconButton } from "@chakra-ui/react";
import { Check, X } from "lucide-react";

import { styles } from "@/styles/goals/goalsSidebarTask.styles";
import { TaskType } from "@/features/goal/types/Task";

import { useGoalSidebarTask } from "@/features/goal/hooks/useGoalSidebarTask";

interface Props {
   task: TaskType;
}

export function GoalSidebarTask({
   task,
}: Props) {

   const {
      handleDeleteTask,
      handleCheckTask,
   } = useGoalSidebarTask({
      task,
   });

   return (
      <Flex {...styles.container} {...(task.isChecked && styles.checkedContainer)}>

         <Text>{task.title}</Text>

         <Flex {...styles.buttons.container}>
            <IconButton
               size="xs"
               {...styles.buttons.deleteButton}
               {...(task.isChecked && styles.buttons.checkedStyle)}
               onClick={handleDeleteTask}
            >
               <X />
            </IconButton>

            <IconButton
               size="xs"
               {...styles.buttons.checkButton}
               {...(task.isChecked && styles.buttons.checkedStyle)}
               onClick={handleCheckTask}
            >
               {task.isChecked && <Check />}
            </IconButton>
         </Flex>

      </Flex>
   );
}
