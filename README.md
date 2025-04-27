# DevTinder Backend

This is the backend for the DevTinder project, a social media platform like Tinder where developers can connect with each other. It is built using **Node.js**, **Express.js**, and **MongoDB**.

## Features

- **User Authentication**: 
  - Signup and login with JWT-based authentication using cookies.
- **Profile Management**: 
  - APIs for creating, updating, and managing user profiles.
- **Feed**:
  - Display user cards in the feed with basic user details.
- **Interaction Features**:
  - Send connection requests, accept or reject requests, and like or ignore other users.
- **API Testing**:
  - APIs are tested using **Postman** for functionality and reliability.

## Technologies Used

- **Node.js**: JavaScript runtime to build the server.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing user data and profiles.
- **JWT (JSON Web Token)**: For user authentication and session management.
- **Cookie-based authentication**: Secure JWT token storage.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/santhoshhegde/DevTinder.git
    cd DevTinder
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables in a `.env` file:
    ```
    MONGODB_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT secret key>
    PORT=5000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

## Frontend Repository

For the frontend part of the DevTinder app, visit the [frontend repository](https://github.com/santhoshhegde/DevTinder-Frontend.git).

## API Testing with Postman

You can test all the available API endpoints using Postman. The API documentation is available in the `postman_collection.json` file.

## Contributing

Feel free to fork the repository, create pull requests, and contribute to the project.
