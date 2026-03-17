import { GoalModel } from "@/features/goal/models/Goal";

export async function getUserGoals(userId: string) {
  return GoalModel.find({ userId }).lean();
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
