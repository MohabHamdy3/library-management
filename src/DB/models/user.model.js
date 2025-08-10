import mongoose from "mongoose";

export const userRoles = {
  USER: "user",
  ADMIN: "admin",
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.USER,
  },
},
{
    timestamps: true,
});

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;

userModel.syncIndexes();