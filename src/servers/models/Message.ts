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
        required: true,
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
    ref: 'User', type: String  
  },
  sfind: {
    ref: "Sfind", type: String
  },
  deletedAt: {
    type: Date,
  }
});

const Message = mongoose.models.Message || mongoose.model("Message", Messagechema);

export default Message;