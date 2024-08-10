import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

interface UserPayload {
  email: string;
  role: "user" | "superadmin";
}

interface req extends Request {
  user?: UserPayload;
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req: req, res: Response) => {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(404).json({ message: "User not found" });
    } else {
    }
    const user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
