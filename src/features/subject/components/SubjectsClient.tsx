"use client"
import { styles } from "@/src/styles/home/home.styles";
import scrollStyles from "@/styles/sidebar/scroll.module.css";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { CreateSubjectDialog } from "@/src/features/subject/components/CreateSubjectDialog";
import { Subject } from "@/features/subject/components/Subject";
import { Subject as SubjectType } from "../types/Subject";

type SubjectsClientProps = {
   subjects: SubjectType[];
}

export function SubjectsClient({ subjects }: SubjectsClientProps) {
   console.log(subjects)
   return (
      <Flex {...styles.container}>
         {/* Título e botão de criar */}
         <Flex {...styles.header.container}>
            <Text {...styles.header.title}>
               Conteúdos
            </Text>
            <CreateSubjectDialog />
         </Flex>

         {/* grid de conteudos */}
         <Grid {...styles.grid} className={scrollStyles["scrollbar"]}>
            {subjects.map((subject) => <Subject key={subject.id} subject={subject} />)}
         </Grid>
      </Flex>
   )
}