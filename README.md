
# Airbnb Clone - MERN Stack Project

This is a repository for an Airbnb clone project built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project aims to replicate some of the core functionalities of the Airbnb platform, allowing users to create an account, create new accommodation ads, make bookings, and view their bookings as well as all available ads.


## Features

- User authentication: Users can create an account, log in, and log out. Authentication is implemented using JWT (JSON Web Tokens) for secure user sessions.
- Accommodation Ads: Users can create new accommodation ads by providing details such as title, description, location, price, and images. They can also edit or delete their own ads.
- Booking System: Users can make bookings for available accommodations by specifying the desired dates and the number of guests. They can also view the bookings made.
- Cross platform


## Tech Stack

The project utilizes the following technologies:

**Frontend:**

React.js: A JavaScript library for building user interfaces.
React Router: A library for routing in the React application.
Redux: A predictable state container for managing application state.
Axios: A promise-based HTTP client for making API requests.

**Backend:**

Node.js: A JavaScript runtime for server-side development.
Express.js: A web application framework for Node.js.
MongoDB: A NoSQL database for storing data.
Mongoose: An Object-Data Mapping library for MongoDB.
Authentication: JWT (JSON Web Tokens): A secure way to transmit information between parties as a JSON object.


## Getting started

To get started with the project, follow these steps:

1. Clone the repository to your local machine using the following command: ``git clone https://github.com/your-username/airbnb_clone_project.git``

2. Navigate to the project directory: ``cd airbnb_clone_project``

3. Install the dependencies for both the frontend and backend: ``cd client && npm install``
``cd ../api && npm install``

4. Configure the environment variables: Create a .env file in the server directory. Define the required environment variables (e.g., MongoDB connection URI, JWT secret key, etc.) in the .env file.

5. Start the development servers:

In the server directory, run ``npm start`` to start the backend server.
In the client directory, run ``npm run dev`` to start the frontend development server.

6. Access the application:

Open your browser and navigate to http://localhost:4000 to access the Airbnb clone application.
