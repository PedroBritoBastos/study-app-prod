"use client";

import { Select, Portal, createListCollection } from "@chakra-ui/react";
import { SchedulesDataType } from "@/features/schedule/types/GlobalScheduleData";

import { useSchedulesPageClientFilter } from "@/features/schedule/hooks/useSchedulesPageClientFilter";

const options = createListCollection({
   items: [
      { label: "Todos", value: "all" },
      { label: "Mês", value: "month" },
      { label: "Data", value: "date" }
   ],
})

type SchedulesPageClientFilterProps = {
   serverData: SchedulesDataType[];
}

export function SchedulesPageClientFilter({ serverData }: SchedulesPageClientFilterProps) {

   const { handleFilter } = useSchedulesPageClientFilter(serverData);

   return (
      <Select.Root
         collection={options}
         width="200px"
         variant={"outline"}
         onValueChange={handleFilter}
      >
         <Select.HiddenSelect />
         <Select.Control>
            <Select.Trigger>
               <Select.ValueText placeholder="Filtrar por:" />
            </Select.Trigger>
            <Select.IndicatorGroup>
               <Select.Indicator />
            </Select.IndicatorGroup>
         </Select.Control>
         <Portal>
            <Select.Positioner>
               <Select.Content>
                  {options.items.map((option) => (
                     <Select.Item item={option} key={option.value}>
                        {option.label}
                        <Select.ItemIndicator />
                     </Select.Item>
                  ))}
               </Select.Content>
            </Select.Positioner>
         </Portal>
      </Select.Root>
   )
}