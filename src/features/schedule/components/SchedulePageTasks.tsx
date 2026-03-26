"use client";

import { Stack } from "@chakra-ui/react";
import { SchedulePageTask } from "@/features/schedule/components/SchedulePageTask";

import { styles } from "@/features/schedule/styles/schedulePageTasks";
import ScrollStyles from "@/styles/sidebar/scroll.module.css";

import { useSchedulePageTasks } from "@/features/schedule/hooks/useSchedulePageTasks";

import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

type SchedulePageProps = {
   currentScheduleTasks: ScheduleTaskType[];
}

export function SchedulePageTasks({ currentScheduleTasks }: SchedulePageProps) {
   const { scheduleTasks } = useSchedulePageTasks(currentScheduleTasks);

   return (
      <Stack
         {...styles.container}
         className={ScrollStyles["scrollbar"]}
      >
         {
            currentScheduleTasks.map((scheduleTask) => (
               <SchedulePageTask
                  key={scheduleTask.id}
                  scheduleTask={scheduleTask}
               />
            ))
         }
      </Stack>
   )
}