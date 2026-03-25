"use client";

import { styles } from "@/features/schedule/styles/columnTask.styles";
import { Text } from "@chakra-ui/react"

export function ColumnTask({ title }: { title: string }) {
   return <Text {...styles.task}>{title}</Text>
}