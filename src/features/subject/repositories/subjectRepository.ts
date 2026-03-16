import { Subject } from "@/src/features/subject/models/SubjectModel";

export async function createSubject(
  title: string,
  content: string,
  userId: string,
) {
  return Subject.create({
    title,
    content,
    userId,
  });
}
