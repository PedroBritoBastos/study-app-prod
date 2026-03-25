"use server";

import { getScheduleByIdAction } from "@/src/features/schedule/actions/schedules/getScheduleById";

type SchedulePageProps = {
   params: Promise<{ id: string }>
}

export default async function SchedulePage({ params }: SchedulePageProps) {
   const { id } = await params;
   const schedule = await getScheduleByIdAction(id);
   console.log(schedule)
   return (
      <div>

      </div>
   )
}