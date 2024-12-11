import Event from "../models/Event";

// Create a new event in the database
export const createEvent = async (data: any) => {
  // Create a new Event instance with the provided data
  const event = new Event(data);
  // Save the event to the database
  await event.save();
  // Return the created event
  return event;
};

// Get events with optional filtering by status, and support for pagination
export const getEvents = async (
  status?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    // If a status is provided, create a filter object to search events by status
    const filter = status ? { status } : {};

    // Pagination logic: Calculate how many documents to skip based on the current page and pageSize
    const skip = (page - 1) * pageSize;

    // Perform an aggregation query to get events with the specified filter, pagination, and sorting
    const data = await Event.aggregate([
      // Match events based on the filter (status)
      { $match: filter },
      // Project the specific fields to return in the response
      {
        $project: {
          name: 1,
          startDate: 1,
          endDate: 1,
          location: 1,
          status: 1,
        },
      },
      // Skip the number of documents based on the pagination (page * pageSize)
      { $skip: skip },
      // Limit the number of events returned based on the pageSize
      { $limit: pageSize },
      // Sort events by creation date in descending order
      { $sort: { createdAt: -1 } },
    ]);

    // Get the total count of events to determine the total number of pages
    const totalRecord = await Event.countDocuments(filter);

    // Calculate the total number of pages based on the total record count and pageSize
    const totalPages = Math.ceil(totalRecord / pageSize);

    // Return the events data along with pagination information
    return {
      data,
      totalRecord,
      totalPages,
      currentPage: page,
      pageSize,
    };
  } catch (error) {
    // If an error occurs during the aggregation or pagination process, throw an error with the message
    throw new Error(error.message);
  }
};

// Update an existing event by its ID with new data
export const updateEvent = async (eventId: string, data: any) => {
  // Find the event by its ID and update it with the new data, returning the updated event
  const event = await Event.findByIdAndUpdate(eventId, data, { new: true });
  if (!event) {
    // If the event is not found, throw an error
    throw new Error("Event not found");
  }
  // Return the updated event
  return event;
};

// Delete an event by its ID
export const deleteEvent = async (eventId: string) => {
  // Find the event by its ID and delete it
  const event = await Event.findByIdAndDelete(eventId);
  if (!event) {
    // If the event is not found, throw an error
    throw new Error("Event not found");
  }
  // Return the deleted event
  return event;
};

// Get counts of event cards by status
export const getEventCardsByStatus = async () => {
  // Count events with status "ongoing"
  const ongoingCount = await Event.countDocuments({
    status: "Ongoing",
    isDeleted: false,
  });
  // Count events with status "completed"
  const completedCount = await Event.countDocuments({
    status: "Completed",
    isDeleted: false,
  });

  // Return the counts in the required format
  return {
    ongoing: ongoingCount,
    completed: completedCount,
  };
};
