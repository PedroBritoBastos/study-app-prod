"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { createSubject } from "../repositories/subjectRepository";
import { revalidatePath } from "next/cache";

export async function createSubjectAction(formData: FormData): Promise<void> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Título e conteúdo são obrigatórios");
  }

  await createSubject(title, content, user.id);
  revalidatePath("/subjects");
}
