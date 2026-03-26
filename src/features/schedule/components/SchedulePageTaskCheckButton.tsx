"use client"

import { Checkbox } from "@chakra-ui/react"

interface Props {
   onCheck: () => void;
   isChecked: boolean;
}

export function SchedulePageTaskCheckButton({ onCheck, isChecked }: Props) {
   return (
      <Checkbox.Root variant={"solid"} colorPalette={"purple"} bg={"gray.300"} size={"lg"} checked={isChecked} onCheckedChange={onCheck}>
         <Checkbox.HiddenInput />
         <Checkbox.Control />
      </Checkbox.Root>
   )
}