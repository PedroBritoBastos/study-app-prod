"use server";

import { getScheduleByIdAction } from "@/src/features/schedule/actions/schedules/getScheduleById";

import { Navbar } from "@/src/components/ui/navbar/Navbar";
import { SchedulePageTasks } from "@/src/features/schedule/components/SchedulePageTasks";
import { SchedulePageReturnButton } from "@/src/features/schedule/components/SchedulePageReturnButton";

import { formatDate } from "@/src/utilities/dateUtils";
import { Flex, Text, Box } from "@chakra-ui/react";


type SchedulePageProps = {
   params: Promise<{ id: string }>
}

export default async function SchedulePage({ params }: SchedulePageProps) {
   const { id } = await params;
   const schedule = await getScheduleByIdAction(id);

   return (
      <>
         <Navbar />
         <Box
            py={6}
            px={12}
            flex={1}
            display={"flex"}
            flexDirection={"column"}
         >
            <Flex
               alignItems={"center"}
               gap={5}
               mb={12}
            >
               <SchedulePageReturnButton />
               <Text
                  letterSpacing={2}
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  color={"gray.700"}
               >
                  {schedule && formatDate(schedule.schedule.scheduleDay.toISOString())}
               </Text>
               <Text
                  mt={2}
                  letterSpacing={1}
                  fontSize={"md"}
                  fontWeight={"semibold"}
                  color={"gray.600"}
               >
                  {
                     schedule && (schedule.schedule.scheduleDay.toLocaleDateString("pt-BR", { weekday: "long" }))
                  }
               </Text>
            </Flex>

            {/* em andamento */}
            <SchedulePageTasks
               currentScheduleTasks={schedule.currentScheduleTasks}
               scheduleId={id}
            />
         </Box>
      </>
   )
}