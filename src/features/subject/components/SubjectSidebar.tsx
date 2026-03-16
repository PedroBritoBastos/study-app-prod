
import { styles } from "@/src/styles/sidebar/subjectSidebar.styles";

// components
import { SidebarContainer } from "@/components/ui/sidebar/SidebarContainer";
import { DeleteSubjectDialog } from "@/features/subject/components/DeleteSubjectDialog";
import { Flex, Icon, Text, Stack } from "@chakra-ui/react";

// types
import { Subject } from "@/features/subject/types/Subject";
import { Calendar1 } from "lucide-react";

// utils
import { formatDate } from "@/src/utilities/dateUtils";

type SubjectSidebarProps = {
   selectedSubject: Subject;
   closeSidebar: () => void;
   isSidebarOpen: boolean;
}

export function SubjectSidebar({
   selectedSubject,
   closeSidebar,
   isSidebarOpen
}: SubjectSidebarProps) {
   return (
      <SidebarContainer
         closeSidebar={closeSidebar}
         header={selectedSubject && selectedSubject.title}
         isSidebarOpen={isSidebarOpen}
      >
         <Stack {...styles.container}>
            <Stack>
               {/* data de criacao */}
               <Flex {...styles.dateContainer}>
                  <Icon>
                     <Calendar1 />
                  </Icon>
                  <Text>
                     Criado em {selectedSubject && formatDate(selectedSubject.currentDate)}
                  </Text>
               </Flex>

               {/* conteudo da materia */}
               <Text {...styles.description.title}>Descricao</Text>
               <Text {...styles.description.content}>{selectedSubject && selectedSubject.content}</Text>
            </Stack>

            <Stack>
               {/* botão para abrir modal de exclusão de conteúdo */}
               <DeleteSubjectDialog
                  id={selectedSubject.id}
                  onCloseSidebar={closeSidebar}
               />
            </Stack>
         </Stack>
      </SidebarContainer>
   );
}
