import { TaskType } from "./Task";

export type GoalType = {
  id: string;
  title: string;
  userId: string;
  tasks: TaskType[];
  deadline: Date;
};
