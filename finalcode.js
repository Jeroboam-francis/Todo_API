// final code contains the final code for the project with comments// Importing the required packages
import express from "express"; // Express framework for building APIs
import { PrismaClient } from "@prisma/client"; // Prisma client for database interaction
import validateTodo from "./middleware/validateTodo.js"; // Middleware to validate TODO requests

// Creating an instance of PrismaClient to interact with the database
const client = new PrismaClient();

// Initializing the Express app
const app = express();

let port; // Variable to hold the port number

// Middleware to parse incoming JSON requests
app.use(express.json());

// Uncomment the line below if you want to apply validateTodo middleware to all routes
// app.use(validateTodo);

// Route to fetch all tasks from the database
app.get("/tasks", async (req, res) => {
  try {
    // Fetching all tasks using Prisma's findMany method
    const tasks = await client.taskItem.findMany();

    // Responding with the fetched tasks
    res.status(200).json({
      status: "success",
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (e) {
    // Handling errors and responding with a 500 status
    res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
});

// Route to fetch a specific task based on its ID
app.get("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params; // Extracting taskId from the URL

  try {
    // Finding a single task that matches the taskId
    const task = await client.taskItem.findFirst({
      where: { id: taskId },
    });

    // If task is not found, send a 404 error
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    // Responding with the found task
    res.status(200).json({
      status: "success",
      message: "Task fetched successfully",
      data: task,
    });
  } catch (e) {
    // Handling errors and responding with a 500 status
    res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
});

// Route to create a new task
app.post("/tasks", validateTodo, async (req, res) => {
  // ValidateTodo middleware will run before this handler
  const { taskTitle, taskDescription } = req.body; // Extracting task details from the request body

  try {
    // Creating a new task in the database
    const newTask = await client.taskItem.create({
      data: {
        taskTitle,
        taskDescription,
      },
    });

    // Responding with the created task
    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: newTask,
    });
  } catch (e) {
    // Handling errors and responding with a 500 status
    res.status(500).json({
      message: "An error occurred",
    });

    // Optional: Logic for error handling (save to file/database or send to monitoring services)
  }
});

// Route to update an existing task based on its ID
app.patch("/tasks/:taskId", async (req, res) => {
  const { taskTitle, taskDescription, isComplete } = req.body; // Extracting fields to update
  const { taskId } = req.params; // Extracting taskId from the URL

  try {
    // Updating the task with only the fields passed in the request body
    const updatedTask = await client.taskItem.update({
      where: {
        id: taskId,
      },
      data: {
        taskTitle: taskTitle && taskTitle, // Update if taskTitle is provided
        taskDescription: taskDescription && taskDescription, // Update if taskDescription is provided
        isComplete: isComplete && isComplete, // Update if isComplete is provided
      },
    });

    // Responding with the updated task
    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (e) {
    // Handling errors and responding with a 500 status
    res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
});

// Route to delete a task based on its ID
app.delete("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params; // Extracting taskId from the URL

  try {
    // Deleting the task with the given taskId
    await client.taskItem.delete({
      where: {
        id: taskId,
      },
    });

    // Responding with a success message
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (e) {
    // Handling errors and responding with a 500 status
    res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
});

// Setting up the server port
if (process.env.PORT) {
  port = process.env.PORT; // Use the port from environment variables if available
} else {
  port = 3000; // Default to port 3000 if no environment variable is set
}

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Logging a message to confirm the server is running
});
