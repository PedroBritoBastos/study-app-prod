import { Schema, model, models, Types } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  isChecked: {
    type: Boolean,
    default: false,
  },

  goalId: {
    type: Types.ObjectId,
    ref: "Goal",
    required: true,
  },

  userId: {
    type: Types.ObjectId,
    required: true,
  },
});

export const TaskModel = models.Task || model("Task", TaskSchema);
