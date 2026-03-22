import { ScheduleContextProvider } from "@/src/features/schedule/contexts/ScheduleContext";

export default function SchedulesLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <ScheduleContextProvider>
         {children}
      </ScheduleContextProvider>
   )
}