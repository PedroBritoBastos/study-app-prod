
import { styles } from "@/src/styles/sidebar/subjectSidebar.styles";

// components
import { SidebarContainer } from "@/components/ui/sidebar/SidebarContainer";
import { Flex, Icon, Text, Stack } from "@chakra-ui/react";


// types
import { Subject } from "@/features/subject/types/Subject";
import { Calendar1 } from "lucide-react";

// utils
import { formatDate } from "@/src/utilities/dateUtils";

interface SubjectSidebarProps {
   selectedSubject: Subject | null;
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
         </Stack>
      </SidebarContainer>
   );
}
