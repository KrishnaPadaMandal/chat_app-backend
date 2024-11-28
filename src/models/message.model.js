import mongoose from "mongoose";

const { Schema } = mongoose; 

const messageSchema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reciver_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    message_image: {
      type: String,
      default: "",
    },
    iv:{
        type:String,
        require:true

    }
  },
  { timestamps: true } 
);

const Message = mongoose.model("Message", messageSchema); 
export default Message;
