import { Schema, model, Document } from "mongoose";

interface User extends Document {
  email: string;
  password: string;
  role: "superadmin" | "user";
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "user"], default: "user" },
});

export default model<User>("User", userSchema);
