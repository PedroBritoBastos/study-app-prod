"use client"
import { styles } from "@/src/styles/home/home.styles";
import { Flex, Text } from "@chakra-ui/react";
import { CreateSubjectDialog } from "@/src/features/subject/components/CreateSubjectDialog";

export function SubjectsClient() {
   return (
      <Flex {...styles.container}>
         {/* Título e botão de criar */}
         <Flex {...styles.header.container}>
            <Text {...styles.header.title}>
               Conteúdos
            </Text>
            <CreateSubjectDialog />
         </Flex>
      </Flex>
   )
}