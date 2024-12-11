# Event Management System Backend (Node.js + TypeScript)

This project is the **backend** for the Event Management System. It provides RESTful APIs for managing events and user authentication. The backend is developed using **Node.js** and **TypeScript**.

## Features

### Admin Features
- **Registration and Login**: Admins can register and log in to manage events.
- **Create Events**: Add new events with relevant details.
- **List Events**: View all created events.
- **Filter Events**: Search or filter events based on criteria.
- **Update Events**: Modify event details.
- **Delete Events**: Remove events from the system.

### User Features
- **View Events**: Users can list and view events created by the admin.

---

## Installation and Setup

Follow these steps to clone and run the backend locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Iqrarijaz/event-management-system-backend.git
   cd event-management-system-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=3001
     DATABASE_URL=your-database-connection-string
     JWT_SECRET=your-jwt-secret
     ```

4. Run the server:

   ```bash
   npx tsx .\server.ts
   ```

5. The API will be available at:
   ```
   http://localhost:3001
   ```

---

## Folder Structure

The project is structured as follows:

```
|-- src
    |-- controllers       # Request handlers
    |-- middleware        # Authentication and other middleware
    |-- models            # Database models
    |-- routes            # API routes
    |-- services          # Business logic
    |-- utils             # Utility functions
    |-- server.ts         # Entry point
```

---

## Frontend Repository

The frontend of this project is available at:

[Event Management System Frontend](https://github.com/Iqrarijaz/event-management-system-frontend.git)

---

## Tech Stack
- **Backend**: Node.js, Express.js, TypeScript, Sequelize (or Mongoose for MongoDB).
- **Database**: PostgreSQL or MongoDB (update based on your implementation).
- **Authentication**: JWT (JSON Web Tokens).

---

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
