import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

interface LoginResponse {
  token: string;
  user: {
    email: string;
    role: "user" | "superadmin";
  };
}

export const registerUser = async (
  email: string,
  password: string,
  role: "user" | "superadmin" = "user"
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  return {
    email: newUser.email,
    role: newUser.role,
  };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.email, user.role);

  return {
    token,
    user: {
      email: user.email,
      role: user.role,
    },
  };
};

export const generateToken = (email: string, role: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): AuthenticatedRequest["user"] => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as AuthenticatedRequest["user"];
    return decoded;
  } catch (err) {
    throw new Error("Token is not valid");
  }
};
