import { GoalModel } from "@/features/goal/models/Goal";
import { GoalType } from "../types/Goal";
import { ObjectId } from "mongoose";
import { deleteTasksByGoalId } from "@/features/goal/repositories/tasksRepository";

export async function getUserGoals(userId: string) {
  function mapGoalModel(goal: {
    _id: ObjectId;
    title: string;
    deadline: Date;
    userId: ObjectId;
  }) {
    return {
      id: goal._id.toString(),
      title: goal.title,
      userId: goal.userId.toString(),
      deadline: goal.deadline,
    };
  }

  const goals = await GoalModel.find({ userId }).lean();
  return goals.map(mapGoalModel);
}

export async function createGoal(
  title: string,
  deadline: Date,
  userId: string,
): Promise<GoalType> {
  const goal = await GoalModel.create({
    title,
    deadline,
    userId,
  });

  const obj = goal.toObject();

  return {
    id: obj._id,
    title: obj.title,
    userId: obj.userId,
    deadline: obj.deadline,
  };
}

export async function getGoalByUserId(userId: string) {
  const goal = await GoalModel.findOne({ userId: userId });
  return goal;
}

export async function getGoalById(id: string) {
  const goal = await GoalModel.find({ id: id });
  return goal;
}

export async function getGoalDealine(id: string) {
  const deadline = await GoalModel.findById(id).select("deadline").lean();
  return deadline;
}

export async function updateGoalDeadline(id: string, newDate: string) {
  await GoalModel.updateOne(
    { _id: id },
    { $set: { deadline: new Date(newDate) } },
  );
}

export async function deleteGoalById(id: string): Promise<void> {
  await deleteTasksByGoalId(id);
  await GoalModel.findByIdAndDelete(id);
}
