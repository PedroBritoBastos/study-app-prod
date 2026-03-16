import { Card, Box, Text, Flex, Tooltip } from "@chakra-ui/react";

import { styles } from "@/styles/subject/subject.styles";
import { Calendar1 } from "lucide-react";

// utils
import { formatDate } from "@/utilities/dateUtils";

import { Subject as SubjectType } from "@/features/subject/types/Subject";

type SubjectProps = {
   subject: SubjectType;
   onOpenSidebar: () => void;
   onSelectSubject: (subject: SubjectType) => void;
}

export function Subject({
   subject,
   onOpenSidebar,
   onSelectSubject
}: SubjectProps) {

   const handleSelectSubject = (e: React.MouseEvent<HTMLDivElement>): void => {
      e.preventDefault();
      onOpenSidebar();
      onSelectSubject(subject);
   }

   return <Card.Root {...styles.card.root} onClick={handleSelectSubject}>
      <Card.Body {...styles.card.body}>
         <Box {...styles.header.container}>
            <Text {...styles.header.title}>
               {subject.title}
            </Text>
         </Box>

         {/* data */}
         <Flex {...styles.date.container}>
            <Calendar1 />
            <Text {...styles.date.text}>
               {formatDate(subject.currentDate)}
            </Text>
         </Flex>

         {/* conteudo */}
         <Text {...styles.content.text}>
            {subject.content}
         </Text>
      </Card.Body>
   </Card.Root>
}