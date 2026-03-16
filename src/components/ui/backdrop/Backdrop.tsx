"use client"

import { Box } from "@chakra-ui/react";

import { styles } from "@/styles/backdrop/backdrop.styles";

interface Props {
   isOpen: boolean;
   onClick?: () => void;
   zIndex?: number;
   bg?: string;
};

export function Backdrop({
   isOpen,
   onClick,
   zIndex = 99,
   bg = "blackAlpha.600",
}: Props) {
   return (
      <Box
         {...styles.container}
         {...(isOpen ? styles.visible : styles.hidden)}
         zIndex={zIndex}
         onClick={onClick}
      />
   );
}