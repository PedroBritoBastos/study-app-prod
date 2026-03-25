"use server";

import ScrollStyles from "@/styles/sidebar/scroll.module.css"
import { getScheduleByIdAction } from "@/src/features/schedule/actions/schedules/getScheduleById";

import { Navbar } from "@/src/components/ui/navbar/Navbar";
import { formatDate } from "@/src/utilities/dateUtils";
import { Flex, Stack, Text, Box } from "@chakra-ui/react";

type SchedulePageProps = {
   params: Promise<{ id: string }>
}

export default async function SchedulePage({ params }: SchedulePageProps) {
   const { id } = await params;
   const schedule = await getScheduleByIdAction(id);
   console.log(schedule)
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
                     schedule && (schedule.schedule.scheduleDay.toLocaleDateString("pt-BR", { weekday: "long" }))?.charAt(0).toUpperCase() + (schedule.schedule.scheduleDay.toLocaleDateString("pt-BR", { weekday: "long" }))?.slice(1)
                  }
               </Text>
            </Flex>

            {/* tarefas */}
            <Text
               fontSize={"md"}
               color={"purple.800"}
               mb={6}
               ml={5}
            >
               Tarefas
            </Text>
            {/* em andamento */}
            <Stack
               flex={1}
               gap={4}
               px={6}
               minH={0}
               overflowY={"auto"}
               className={ScrollStyles["scrollbar"]}
            >
            </Stack>
         </Box>
      </>
   )
}