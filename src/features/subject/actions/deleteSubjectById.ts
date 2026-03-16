"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { deleteSubjectById } from "@/src/features/subject/repositories/subjectRepository";
import { revalidatePath } from "next/cache";

export async function deleteSubjectByIdAction(id: string): Promise<void> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  if (!id) {
    throw new Error("ID inválido");
  }

  await deleteSubjectById(id, user.id);
  revalidatePath("/subjects");
}
