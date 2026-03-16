import { Subject } from "@/src/features/subject/models/SubjectModel";
import { ObjectId } from "mongoose";

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

export async function getUserSubjects(userId: string) {
  function mapSubject(subject: {
    _id: ObjectId;
    title: string;
    content: string;
    userId: ObjectId;
    currentDate: Date;
  }) {
    return {
      id: subject._id.toString(),
      title: subject.title,
      content: subject.content,
      userId: subject.userId.toString(),
      currentDate: subject.currentDate,
    };
  }

  const subjects = await Subject.find({ userId }).lean();

  return subjects.map(mapSubject);
}

export async function deleteSubjectById(id: string, userId: string) {
  return Subject.findOneAndDelete({
    _id: id,
    userId,
  });
}
