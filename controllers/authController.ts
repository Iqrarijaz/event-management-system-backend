import { Request, Response } from "express";
import { registration, login } from "../services/authService";
import User from "../models/User"; // Assuming you have a User model

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Destructure required fields from the request body
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, role and password are required.",
      });
    }

    // Validate email format (basic regex for email validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Role must be user or admin
    if (role !== "user" && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Role must be either 'user' or 'admin'.",
      });
    }

    // Validate password length (greater than 4 characters)
    if (password.length <= 4) {
      return res.status(400).json({
        success: false,
        message: "Password must be longer than 4 characters.",
      });
    }

    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email, isDeleted: false });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // Proceed with the registration
    const user = await registration(name, email, password, role);

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Registration completed successfully.",
    });
  } catch (error: any) {
    // Log the error (optional, for debugging purposes)
    console.error("Error during admin registration:", error);

    // Respond with an error message
    res.status(400).json({
      success: false,
      message: "Something went wrong during registration. Please try again.",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Destructure required fields from the request body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Call the login service
    const result = await login(email, password);

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result, // Optionally include the login result (e.g., token)
    });
  } catch (error: any) {
    // Log the error (optional)
    console.error("Error during login:", error);

    // Respond with an error message
    res.status(400).json({
      success: false,
      message: "Invalid email or password.",
      error: error.message,
    });
  }
};
