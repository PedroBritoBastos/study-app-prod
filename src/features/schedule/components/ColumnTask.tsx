"use client";

import { styles } from "@/features/schedule/styles/columnTask.styles";
import { Flex, Icon, Text } from "@chakra-ui/react"
import { Clock2 } from "lucide-react";

type ColumnTaskProps = {
   title: string;
   executionTime: string;
}

export function ColumnTask({
   title,
   executionTime
}: ColumnTaskProps) {

   return (
      <Flex {...styles.task}>
         {title}
         <Flex {...styles.executionTime}>
            <Icon size={"sm"}>
               <Clock2 />
            </Icon>
            <Text>
               {executionTime ? executionTime : "--:--"}
            </Text>
         </Flex>
      </Flex>
   )
}