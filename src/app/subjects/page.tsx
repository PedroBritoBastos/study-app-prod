import { Navbar } from "@/src/components/ui/navbar/Navbar"
import { SubjectsClient } from "@/src/features/subject/components/SubjectsClient";
import { Flex } from "@chakra-ui/react"

import { getUserSubjectsAction } from "@/src/features/subject/actions/getUserSubjects";

export default async function SubjectsPage() {
  const subjects = await getUserSubjectsAction();
  return <>
    <Flex flex={1} w={"100%"}>
      <Navbar />
      <SubjectsClient subjects={subjects} />
    </Flex>
  </>
}
