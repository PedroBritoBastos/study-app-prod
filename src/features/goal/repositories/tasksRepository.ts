import { TaskModel } from "@/features/goal/models/Task";
import { ObjectId } from "mongoose";

export async function createTask(title: string, goalId: string) {
  return TaskModel.create({
    title,
    goalId,
    isChecked: false,
  });
}

export async function getTasks(goalId: string) {
  function mapTaskModel(task: {
    _id: ObjectId;
    title: string;
    isChecked: boolean;
    goalId: ObjectId;
  }) {
    return {
      id: task._id.toString(),
      title: task.title,
      isChecked: task.isChecked,
      goalId: task.goalId.toString(),
    };
  }

  const tasks = await TaskModel.find({ goalId: goalId }).lean();
  return tasks.map(mapTaskModel);
}
