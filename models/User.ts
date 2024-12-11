import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: new Date() },
  isDeleted: { type: Boolean, required: true, default: false },
  role: { type: String, required: true, enum: ["admin", "user"] },
  password: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
