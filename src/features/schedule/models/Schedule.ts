import { Schema, model, models, Types } from "mongoose";

const ScheduleSchema = new Schema({
  scheduleDay: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ScheduleModel =
  models.Schedule || model("Schedule", ScheduleSchema);
