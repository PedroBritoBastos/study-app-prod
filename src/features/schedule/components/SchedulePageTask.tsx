"use client"

import { styles } from "@/features/schedule/styles/schedulePageTask.styles";

import { Flex, Text, Icon } from "@chakra-ui/react";
import { Clock } from "lucide-react";
import { SchedulePageTaskCheckButton } from "@/features/schedule/components/SchedulePageTaskCheckButton";
import { SchedulePageTaskDeleteButton } from "@/features/schedule/components/SchedulePageTaskDeleteButton";

import { formatTime } from "@/src/utilities/dateUtils";
import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

import { useSchedulePageTask } from "@/features/schedule/hooks/useSchedulePageTask";

type SchedulePageTaskProps = {
   scheduleTask: ScheduleTaskType;
   onDeleteTask: (taskId: string) => void;
}

export function SchedulePageTask({ scheduleTask, onDeleteTask }: SchedulePageTaskProps) {
   const {
      isChecked,
      handleCheckTask
   } = useSchedulePageTask(scheduleTask.isChecked, scheduleTask.id);

   return (
      <Flex {...styles.container} bg={isChecked ? "gray.100" : "white"}>

         {/* horario */}
         <Flex {...styles.timeContainer}>
            <Icon size={"md"}>
               <Clock />
            </Icon>
            <Text>{scheduleTask.executionTime ? scheduleTask.executionTime : "--:--"}</Text>
         </Flex>

         <Flex {...styles.taskContainer}>
            {/* nome da task */}
            <Text color={isChecked ? "gray.400" : "gray.700"} ml={5} textDecoration={isChecked ? "line-through" : "none"}>{scheduleTask.title}</Text>

            {/* options */}
            <Flex {...styles.optionsContainer}>
               <SchedulePageTaskCheckButton
                  onCheck={handleCheckTask}
                  isChecked={isChecked}
               />
               <SchedulePageTaskDeleteButton
                  isChecked={isChecked}
                  taskId={scheduleTask.id}
                  onDeleteTask={onDeleteTask}
               />
            </Flex>
         </Flex>

      </Flex>
   )
}