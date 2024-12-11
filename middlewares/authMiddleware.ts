import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any; // Add a user property to the Request interface
}

export const authenticateAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization?.split(" ")[1] ?? req.headers.authorization;

  // If token is not provided, return Unauthorized
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach the decoded user info to the request object
    req.user = decoded;

    // Check if the user has an admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Permission denied. Admins only." });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization?.split(" ")[1] ?? req.headers.authorization;

  // If token is not provided, return Unauthorized
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach the decoded user info to the request object
    req.user = decoded;

    // Check if the user has an admin role
    if (req.user.role !== "user") {
      return res.status(403).json({ error: "Permission denied. Users only." });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
