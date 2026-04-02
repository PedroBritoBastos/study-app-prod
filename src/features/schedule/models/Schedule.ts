import { Schema, model, models, Types } from "mongoose";

const ScheduleSchema = new Schema({
  scheduleDay: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: String,
  },

  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ScheduleModel =
  models.Schedule || model("Schedule", ScheduleSchema);
