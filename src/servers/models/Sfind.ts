import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SfindSchema = new Schema({
  nameSfind: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  admin: {
    ref: 'User', type: Schema.Types.ObjectId,
  },
  member: [
    {
        ref: 'User', type: Schema.Types.ObjectId,  
    }
  ],
  lastAction: {
    type: String,
    default: "",
  },
  expireTime: {
    type: Number,
    default: 0,
  }
}, {timestamps: true})

const Sfind = mongoose.models.Sfind || mongoose.model("Sfind", SfindSchema);

export default Sfind;