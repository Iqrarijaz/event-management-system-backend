import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Registration function to create a new user
export const registration = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  // Hash the user's password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new User instance with the provided details and the hashed password
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role, // Assign the role to the user
  });

  // Save the user to the database
  await user.save();

  // Return the saved user object
  return user;
};

// Login function to authenticate a user and generate a JWT token
export const login = async (email: string, password: string) => {
  // Find the user by their email in the database
  const user = await User.findOne({ email });

  // If the user doesn't exist or the password doesn't match, throw an error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  // Generate a JWT token for the user, including their ID and role as the payload
  const token = jwt.sign(
    { userId: user._id, role: user.role }, // Payload (user ID and role)
    process.env.JWT_SECRET as string, // JWT secret key (from environment variables)
    { expiresIn: "100h" } // Set the expiration time for the token (10 hours)
  );

  // Return the generated token and the user details
  return { token, user };
};
