import { Stack, Flex, Heading, IconButton } from "@chakra-ui/react";

// styles
import { styles } from "@/styles/sidebar/sidebarContainerStyles";
import scrollbarStyles from "@/styles/sidebar/scroll.module.css";

// components
import { MoveRight } from "lucide-react"

type Props = {
   children: React.ReactNode;
   closeSidebar: () => void;
   header: string | null;
   isSidebarOpen?: boolean;
}

export function SidebarContainer({ children, closeSidebar, header, isSidebarOpen }: Props) {
   return (
      <Stack
         {...styles.container}
         transform={isSidebarOpen ? "translateX(0)" : "translateX(100%)"}
      >
         <Flex {...styles.header.container}>
            <Heading {...styles.header.heading}>{header}</Heading>
            <IconButton onClick={(e) => closeSidebar()} variant={"outline"}>
               <MoveRight />
            </IconButton>
         </Flex>

         <Stack {...styles.content} className={scrollbarStyles["sidebarScrollbar"]}>
            {children}
         </Stack>
      </Stack>
   );
}