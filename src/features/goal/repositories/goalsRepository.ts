import { GoalModel } from "@/features/goal/models/Goal";
import { GoalType } from "@/features/goal/types/Goal";
import { ObjectId } from "mongoose";

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
) {
  return GoalModel.create({
    title,
    deadline,
    userId,
  });
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
  const result = await GoalModel.updateOne(
    { _id: id },
    { $set: { deadline: new Date(newDate) } },
  );
}
