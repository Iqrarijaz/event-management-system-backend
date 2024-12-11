import { Request, Response } from "express";
import * as eventService from "../services/eventService";
import mongoose from "mongoose";
import { validatePassword } from "../utils/hashUtil";

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  try {
    // Destructure the required fields from the request body
    const { name, startDate, endDate, location,description } = req.body;

    // Validate that required fields are provided
    if (!name || !startDate || !endDate || !location) {
      return res.status(400).json({
        success: false,
        message: "Name, start date, end date, and location are required.",
      });
    }

    // Check if start date is before end date
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "Start date must be earlier than end date.",
      });
    }

    // Proceed with creating the event
    const event = await eventService.createEvent(req.body);

    // Respond with the created event
    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });
  } catch (error: any) {
    // Log the error for debugging (optional)
    console.error("Error creating event:", error);

    // Respond with a generic error message
    res.status(400).json({
      success: false,
      message:
        "Something went wrong while creating the event. Please try again.",
      error: error.message,
    });
  }
};

// Get Events with Pagination
export const getEvents = async (req: Request, res: Response) => {
  try {
    // Extract status, page, and pageSize from query parameters
    const { status, page = 1, limit = 10 } = req.query;

    const validStatuses = ["Ongoing", "Completed"]; // Example of valid status values
    if (status && !validStatuses.includes(status as string)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status value. Allowed values are: Ongoing, Completed.",
      });
    }

    // Convert page and limit to numbers (they are strings by default)
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(limit as string, 10);

    // Validate page and pageSize to ensure they are positive numbers
    if (pageNumber < 1 || pageSizeNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and pageSize must be greater than 0.",
      });
    }

    const events = await eventService.getEvents(
      status as string,
      pageNumber,
      pageSizeNumber
    );

    // Respond with the paginated list of events
    res.status(201).send({
      success: true,
      ...events,
    });
  } catch (error: any) {
    // Log the error for debugging (optional)
    console.error("Error fetching events:", error);

    // Respond with a generic error message
    res.status(400).json({
      success: false,
      message: "Something went wrong while fetching events. Please try again.",
      error: error.message,
    });
  }
};

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;

    // Check if the eventId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format.",
      });
    }

    const updatedEvent = await eventService.updateEvent(eventId, req.body);

    res.status(201).send({
      success: true,
      message: "Event updated successfully.",
      data: updatedEvent,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Something went wrong while updating the event.",
      error: error.message,
    });
  }
};

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    // Extract eventId and password from request params
    const { id: eventId, password } = req.params;

    // Validate if the eventId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format.",
      });
    }

    // Validate the password
    const isPasswordValid = await validatePassword(req?.user?.userId, password); // Assuming req.user is set by authentication middleware
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Proceed with deleting the event
    const deletedEvent = await eventService.deleteEvent(eventId);

    // If no event was found to delete
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while deleting the event.",
      error: error.message,
    });
  }
};

// Delete Event
export const getEventCards = async (req: Request, res: Response) => {
  try {
    const data = await eventService.getEventCardsByStatus();

    return res.status(200).json({
      success: true,
      data,
      message: "Event card fetch successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while getting event cards.",
      error: error.message,
    });
  }
};
