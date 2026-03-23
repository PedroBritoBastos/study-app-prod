import { Schema, model, models, Types } from "mongoose";

const ScheduleTaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  isChecked: {
    type: Boolean,
    default: false,
  },

  executionTime: {
    type: String,
  },

  scheduleId: {
    type: Types.ObjectId,
    ref: "Schedule",
    required: true,
  },

  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ScheduleTaskModel =
  models.ScheduleTask || model("ScheduleTask", ScheduleTaskSchema);
