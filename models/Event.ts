import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  poster: { type: String, default: null },
  description: { type: String, default: null },
  isDeleted: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: new Date() },
  status: { type: String, enum: ["Ongoing", "Completed"], default: "Ongoing" },
});

export default mongoose.model("Event", EventSchema);
