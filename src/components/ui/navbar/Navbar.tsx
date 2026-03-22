'use client'

import {
  Flex,
  Stack,
  Button
} from "@chakra-ui/react";

import { styles } from "@/src/styles/navbar/navbar.styles";

// components
import { NavbarOption } from "@/src/components/ui/navbar/NavbarOption";
import { Calendar, Goal, Pencil } from "lucide-react";
import { logout } from "@/features/auth/actions/logout";

export function Navbar() {

  return <Flex {...styles.container}>
    <Stack {...styles.optionsContainer}>
      <NavbarOption name="Conteúdos" url="/subjects">
        <Pencil />
      </NavbarOption>
      <NavbarOption name="Calendário" url="/calendar">
        <Calendar />
      </NavbarOption>
      <NavbarOption name="Metas" url="/goals">
        <Goal />
      </NavbarOption>
      <NavbarOption name="Cronograma" url="/schedules">
        <Calendar />
      </NavbarOption>
    </Stack>

    {/* botão de logout */}
    <Button {...styles.logoutButton} onClick={logout}>Logout</Button>
  </Flex>
}