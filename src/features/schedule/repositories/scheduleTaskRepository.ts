import { ScheduleTaskModel } from "../models/ScheduleTask";
import { ObjectId } from "mongoose";
import { ScheduleTaskType } from "../types/ScheduleTask";

export async function createScheduleTasks(
  tasks: {
    title: string;
    executionTime: string;
  }[],
  scheduleId: string,
  userId: string,
): Promise<ScheduleTaskType[]> {
  const tasksToCreate = tasks.map((task) => ({
    title: task.title,
    executionTime: task.executionTime,
    scheduleId,
    isChecked: false,
    userId,
  }));

  const createdTasks = await ScheduleTaskModel.insertMany(tasksToCreate);

  return createdTasks.map((task) => ({
    id: task._id.toString(),
    title: task.title,
    executionTime: task.executionTime,
    scheduleId: task.scheduleId.toString(),
    isChecked: task.isChecked,
    userId: task.userId.toString(),
  }));
}

export async function getUserScheduleTasks(
  userId: string,
): Promise<ScheduleTaskType[]> {
  const scheduleTasks = await ScheduleTaskModel.find({ userId: userId });
  return scheduleTasks.map((scheduleTask) => {
    return {
      id: scheduleTask._id.toString(),
      title: scheduleTask.title,
      isChecked: scheduleTask.isChecked,
      executionTime: scheduleTask.executionTime,
      scheduleId: scheduleTask.scheduleId.toString(),
      userId: scheduleTask.userId.toString(),
    };
  });
}

export async function getScheduleTasksByScheduleId(
  scheduleId: string,
): Promise<ScheduleTaskType[]> {
  const scheduleTasks = await ScheduleTaskModel.find({
    scheduleId: scheduleId,
  });

  return scheduleTasks.map((scheduleTask) => {
    return {
      id: scheduleTask._id.toString(),
      title: scheduleTask.title,
      isChecked: scheduleTask.isChecked,
      executionTime: scheduleTask.executionTime,
      scheduleId: scheduleTask.scheduleId.toString(),
      userId: scheduleTask.userId.toString(),
    };
  });
}
