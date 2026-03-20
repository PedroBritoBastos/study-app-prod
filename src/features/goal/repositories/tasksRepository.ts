import { TaskModel } from "@/features/goal/models/Task";
import { TaskType } from "@/features/goal/types/Task";
import { ObjectId } from "mongoose";

export async function createTask(
  title: string,
  goalId: string,
): Promise<TaskType> {
  return TaskModel.create({
    title,
    goalId,
    isChecked: false,
  });
}

export async function getTasks(goalId: string): Promise<TaskType[]> {
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

export async function deleteTaskById(taskId: string): Promise<string> {
  const deletedTask: TaskType | null =
    await TaskModel.findByIdAndDelete(taskId);

  if (!deletedTask) return "";

  const deletedTaskId = deletedTask.id;
  return deletedTaskId;
}

export async function toggleTaskCheckedStatus(taskId: string): Promise<void> {
  const task = await TaskModel.findById(taskId);
  task.isChecked = !task.isChecked;
  await task.save();
}

export async function getTaskById(taskId: string): Promise<TaskType | null> {
  const task = await TaskModel.findById(taskId);
  return task;
}

export async function getTaskStatus(taskId: string): Promise<boolean> {
  const task = await TaskModel.findById(taskId).select("isChecked").lean();
  return task.isChecked;
}
