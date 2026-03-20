"use server";

import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth/getUserFromToken";
import { createGoal } from "@/features/goal/repositories/goalsRepository";
import { revalidatePath } from "next/cache";

export async function createGoalAction(formData: FormData): Promise<void> {
  await connectDB();

  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Não autorizado");
  }

  const title = formData.get("title") as string;
  const deadline = formData.get("deadline") as string;

  if (!title || !deadline) {
    throw new Error("Título ou prazo não podem estar vazios.");
  }

  await createGoal(title, new Date(deadline), user.id);
  revalidatePath("/goals");
}
