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
    type: Date,
  },

  scheduleId: {
    type: Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
});

export const ScheduleTask =
  models.ScheduleTask || model("ScheduleTask", ScheduleTaskSchema);
