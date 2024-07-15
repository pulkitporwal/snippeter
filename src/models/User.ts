import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  clerkUserId: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

const userSchema: Schema<User> = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;
