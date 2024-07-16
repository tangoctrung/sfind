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
  dob: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
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
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;