import { generateToken } from "../lib/utilit.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";  

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if(!fullName || !email || !password)
    {
        return res.status(400).json({ message: "All Field Required" });

    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashPassword
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;  
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      generateToken(user._id, res);  
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export const logout = (req, res) => {
 try {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });

  res.status(200).json({ message: "Successfully logged out" });
    
 } catch (error) {
    
 }
};
