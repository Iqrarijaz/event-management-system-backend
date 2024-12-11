import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};


export const generateToken = (payload: object, expiresIn: string = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};


// Function to validate the password
export const validatePassword = async (userId: string, password: string) => {
  const user = await User.findById(userId);

  // Check if the user exists and compare the provided password with the stored hashed password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return false; // Return false if password is incorrect
  }

  return true; // Return true if password is valid
};
