import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";  
import crypto from "crypto";
const algorithm = "aes-256-cbc";

import dotenv from "dotenv";
dotenv.config();

const iv = crypto.randomBytes(16);

const secretKey = process.env.MESSAGE_SECRET_KEY 

export const createMessage = async (req, res) => {
  try {
    const { sender_id, reciver_id, message,message_image } = req.body;
    if(!sender_id || !reciver_id || !message)
    {
        return res.status(400).json({ message: "All Field Required" });
    }

    const { encryptedData, iv } = encryptMessage(message);

    const newMessage = new Message({
        sender_id, reciver_id, message:encryptedData,iv
      });
    const saveMessage =  await newMessage.save();
      res.status(201).json({ message: "User created successfully",saveMessage:saveMessage });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const messageList = async (req, res) => {
  try {
    const { sender_id } = req.params;

    const messages = await Message.find({ sender_id });
    const decryptedMessages = messages.map((msg) => {
      if (!msg.iv || !msg.message) {
        console.error("Missing iv or message for message ID:", msg._id);
        return { ...msg._doc, message: "Error: Could not decrypt message" };
      }

      return {
        ...msg._doc,
        message: decryptMessage(msg.message, msg.iv),
      };
    });

    res.status(200).json({ message: "Message List", messages: decryptedMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const encryptMessage = (message) => {
    console.log("D message",message)
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    console.log("cipher",cipher)
    let encrypted = cipher.update(message, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { encryptedData: encrypted, iv: iv.toString("hex") };
  };

  export const decryptMessage = (encryptedMessage, iv) => {
    try {
      const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(iv, "hex")
      );
      let decrypted = decipher.update(encryptedMessage, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch (error) {
      console.error("Decryption error:", error);
      return "Error: Could not decrypt message";
    }
  };
  

