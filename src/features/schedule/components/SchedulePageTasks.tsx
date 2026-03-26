"use client";

import { Stack, Text, Flex } from "@chakra-ui/react";
import { SchedulePageTask } from "@/features/schedule/components/SchedulePageTask";
import { SchedulePageTasksCreateDialog } from "@/features/schedule/components/SchedulePageTasksCreateDialog";

import { styles } from "@/features/schedule/styles/schedulePageTasks";
import ScrollStyles from "@/styles/sidebar/scroll.module.css";

import { useSchedulePageTasks } from "@/features/schedule/hooks/useSchedulePageTasks";

import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

type SchedulePageTasksProps = {
   currentScheduleTasks: ScheduleTaskType[];
   scheduleId: string;
}

export function SchedulePageTasks({ currentScheduleTasks, scheduleId }: SchedulePageTasksProps) {
   const {
      scheduleTasks,
      handleDeleteTask,
      handleAddScheduleTask
   } = useSchedulePageTasks(currentScheduleTasks);

   return (
      <>
         {/* tarefas */}
         <Flex
            alignItems={"center"}
            gap={5}
            mb={10}
         >
            <Text
               fontSize={"md"}
               color={"purple.800"}
            >
               Tarefas
            </Text>
            <SchedulePageTasksCreateDialog
               scheduleId={scheduleId}
               onAddScheduleTask={handleAddScheduleTask}
            />
         </Flex>

         <Stack
            {...styles.container}
            className={ScrollStyles["scrollbar"]}
         >
            {
               scheduleTasks.map((scheduleTask) => (
                  <SchedulePageTask
                     key={scheduleTask.id}
                     scheduleTask={scheduleTask}
                     onDeleteTask={handleDeleteTask}
                  />
               ))
            }
         </Stack>
      </>

   )
}