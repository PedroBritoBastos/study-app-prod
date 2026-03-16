"use client"

import { styles } from "@/src/styles/home/home.styles";
import scrollStyles from "@/styles/sidebar/scroll.module.css";

import { Flex, Grid, Text } from "@chakra-ui/react";
import { CreateSubjectDialog } from "@/src/features/subject/components/CreateSubjectDialog";
import { Subject } from "@/features/subject/components/Subject";
import { SubjectSidebar } from "@/features/subject/components/SubjectSidebar";
import { Backdrop } from "@/src/components/ui/backdrop/Backdrop";

import { Subject as SubjectType } from "../types/Subject";

import { useSidebar } from "@/src/hooks/useSidebar";
import { useState } from "react";

type SubjectsClientProps = {
   subjects: SubjectType[];
}

export function SubjectsClient({ subjects }: SubjectsClientProps) {
   // state de materia selecionada
   const [selectedSubject, setSelectedSubject] = useState<SubjectType>({
      id: "",
      title: "",
      content: "",
      userId: "",
      currentDate: new Date()
   });

   const sidebarHook = useSidebar();

   // seleciona uma matéria para apresentar na sidebar
   // state muda quando o componente Subject é clicado
   const handleSelectSubject = (subject: SubjectType): void => {
      setSelectedSubject(subject);
   }

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
            {subjects.map((subject) =>
               <Subject
                  key={subject.id}
                  subject={subject}
                  onOpenSidebar={sidebarHook.openSidebar}
                  onSelectSubject={handleSelectSubject}
               />
            )}
         </Grid>

         {/* backdrop */}
         <Backdrop
            isOpen={sidebarHook.isSidebarOpen}
            onClick={sidebarHook.closeSidebar}
         />

         {/* sidebar */}
         <SubjectSidebar
            selectedSubject={selectedSubject && selectedSubject}
            closeSidebar={sidebarHook.closeSidebar}
            isSidebarOpen={sidebarHook.isSidebarOpen}
         />
      </Flex>
   )
}