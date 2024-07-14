import mongoose from "mongoose";

const SfindSchema = new mongoose.Schema({
  nameSfind: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  admin: {
    ref: 'User', type: String  
  },
  member: [
    {
        ref: 'User', type: String  
    }
  ]
});

const Sfind = mongoose.models.Sfind || mongoose.model("Sfind", SfindSchema);

export default Sfind;