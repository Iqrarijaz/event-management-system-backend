import express from "express";
import * as eventController from "../controllers/eventController";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middlewares/authMiddleware";

const router = express.Router();

// Routes with authentication middleware for admin
router.post("/", authenticateAdmin, eventController.createEvent);
router.get("/cards", authenticateAdmin, eventController.getEventCards);
router.get("/", authenticateAdmin, eventController.getEvents);
router.put("/:id", authenticateAdmin, eventController.updateEvent);

router.delete("/:id/:password", authenticateAdmin, eventController.deleteEvent);

// Routes for public users
router.get("/list", eventController.getEvents);

export default router;
