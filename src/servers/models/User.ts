import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    default: "",
  },
  provider: {
    type: String,
    default: "",
  },
  dob: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;