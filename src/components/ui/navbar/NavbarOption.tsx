import { Button as ChakraButton } from "@chakra-ui/react";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { styles } from "@/src/styles/navbar/navbarOption.styles";

type Props = {
  name: string;
  url: string;
  children?: React.ReactNode;
}

export function NavbarOption({ children, name, url }: Props) {
  const pathname = usePathname();

  const isActive = pathname === url;

  return (
    <Link href={url}>
      <ChakraButton
        {...styles.button}
        {...(isActive && styles.active)}
      >
        {children}
        {name}
      </ChakraButton>
    </Link>
  );
}
