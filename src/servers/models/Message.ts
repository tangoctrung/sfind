import mongoose from "mongoose";

const Messagechema = new mongoose.Schema({
  description: {
    type: String,
    default: "",
  },
  files: [
    {
        urlFile: String,
        nameFile: String,
        sizeFile: Number,
    },
  ],
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  sender: {
    ref: 'User', type: mongoose.Schema.Types.ObjectId,  
  },
  sfind: {
    ref: "Sfind", type: mongoose.Schema.Types.ObjectId,
  },
  deletedAt: {
    type: Date,
  }
}, {timestamps: true});

const Message = mongoose.models.Message || mongoose.model("Message", Messagechema);

export default Message;