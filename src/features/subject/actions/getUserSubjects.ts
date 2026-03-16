"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { getUserSubjects } from "../repositories/subjectRepository";

export async function getUserSubjectsAction() {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const subjects = await getUserSubjects(user.id);

  return subjects;
}
