"use server";

import { Navbar } from "@/src/components/ui/navbar/Navbar";
import { SchedulesPageClient } from "@/src/features/schedule/components/SchedulesPageClient";

import { getUserSchedulesAction } from "@/src/features/schedule/actions/schedules/getUserSchedules";
import { getUserScheduleTasksAction } from "@/src/features/schedule/actions/scheduleTasks/getUserScheduleTasks";
import { ScheduleType } from "@/src/features/schedule/types/Schedule";
import { ScheduleTaskType } from "@/src/features/schedule/types/ScheduleTask";

export default async function SchedulesPage() {
   const schedules: ScheduleType[] = await getUserSchedulesAction();
   const scheduleTasks: ScheduleTaskType[] = await getUserScheduleTasksAction();

   // para cada schedule, retornar as tasks que possuem scheduleId igual ao id da schedule
   const data = schedules.map((schedule) => {
      // cria um array com todas as tasks que pertencem ao scheduleId
      const currentScheduleTasks = scheduleTasks.filter(scheduleTask => {
         if (scheduleTask.scheduleId === schedule.id) return scheduleTask;
      });
      return { schedule, currentScheduleTasks }
   })

   return (
      <>
         <Navbar />
         <SchedulesPageClient data={data} />
      </>
   )
}