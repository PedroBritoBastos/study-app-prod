"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClient.styles";

import { Stack, Grid, Flex, Button, Text, IconButton } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { PageCreateScheduleDialog } from "@/features/schedule/components/PageCreateScheduleDialog";

export function SchedulesPageClient() {
   return (
      <Stack {...styles.container}>
         {/* Criar Schedule */}
         <Flex {...styles.headerContainer}>
            {/* create actions */}
            <Flex>
               <PageCreateScheduleDialog />
            </Flex>

            {/* month control */}
            <Flex {...styles.monthControlContainer}>
               <IconButton size={"xs"} rounded={"full"} colorPalette={"purple"}>
                  <ChevronLeft />
               </IconButton>
               <Text fontSize={"2xl"}>{`mes ano`}</Text>
               <IconButton size={"xs"} rounded={"full"} colorPalette={"purple"}>
                  <ChevronRight />
               </IconButton>
            </Flex>
            {/* ///// */}
         </Flex>

      </Stack>
   )
}