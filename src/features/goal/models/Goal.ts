import { Schema, model, models, Types } from "mongoose";

const GoalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  deadline: {
    type: Date,
    required: true,
  },

  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const GoalModel = models.Goal || model("Goal", GoalSchema);
