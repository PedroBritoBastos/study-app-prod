
"use client"

import { Flex, Text, IconButton } from "@chakra-ui/react";
import { Check, X } from "lucide-react";

import { styles } from "@/styles/goals/goalsSidebarTask.styles";
import { TaskType } from "@/features/goal/types/Task";

import { useGoalSidebarTask } from "@/features/goal/hooks/useGoalSidebarTask";

interface Props {
   task: TaskType;
   updateDeletedTask: (taskId: string) => void;
   updateCheckedTask: (taskId: string, isChecked: boolean) => void;
   refreshGoal: (taskId: string, action: string) => void;
}

export function GoalSidebarTask({
   task,
   updateDeletedTask,
   updateCheckedTask,
   refreshGoal,
}: Props) {

   const {
      checked,
      handleDeleteTask,
      handleCheckTask,
   } = useGoalSidebarTask({
      task,
      updateDeletedTask,
      updateCheckedTask,
      refreshGoal,
   });

   return (
      <Flex {...styles.container} {...(checked && styles.checkedContainer)}>

         <Text>{task.title}</Text>

         <Flex {...styles.buttons.container}>
            <IconButton
               size="xs"
               {...styles.buttons.deleteButton}
               {...(checked && styles.buttons.checkedStyle)}
               onClick={handleDeleteTask}
            >
               <X />
            </IconButton>

            <IconButton
               size="xs"
               {...styles.buttons.checkButton}
               {...(checked && styles.buttons.checkedStyle)}
               onClick={handleCheckTask}
            >
               {checked && <Check />}
            </IconButton>
         </Flex>

      </Flex>
   );
}
