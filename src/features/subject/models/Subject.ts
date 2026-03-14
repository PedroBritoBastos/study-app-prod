import { Schema, model, models, Types } from "mongoose";

const SubjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  currentDate: {
    type: Date,
    default: Date.now,
  },

  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Subject = models.Subject || model("Subject", SubjectSchema);
