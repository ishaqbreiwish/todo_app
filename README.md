# Todo List Application

## Description

This is a simple Todo List application built with Vue.js on the frontend and a Node.js/Express backend. The application allows users to create, read, update, and delete todos. It provides a user-friendly interface to manage tasks effectively.

## Features

- Add new todos with a title and description.
- View a list of existing todos.
- Delete todos from the list.
- Responsive design for better usability on different devices.

## Technologies Used

- **Frontend:** Vue.js, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (make sure it's running)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. Install dependencies for the backend:

   ```bash
   cd server
   npm install
   ```

3. Install dependencies for the frontend:

   ```bash
   cd client
   npm install
   ```

4. Set up your MongoDB database and update the connection string in the `.env` file in the server directory:

   ```
   MONGO_URI=mongodb://<username>:<password>@localhost:27017/<dbname>
   PORT=5000
   ```

5. Start the backend server:

   ```bash
   cd server
   npm start
   ```

6. Start the frontend application:

   ```bash
   cd client
   npm run serve
   ```

7. Open your browser and navigate to `http://localhost:8080` to view the application.

## Usage

- Use the input fields to add a new todo.
- Click the "Add Todo" button to save it.
- Click the "DELETE TODO" button next to any todo to remove it from the list.
