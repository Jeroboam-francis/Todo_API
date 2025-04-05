import express from "express";
import { PrismaClient } from "@prisma/client";
import validateTodo from "./middleware/validateTodo.js";

const client = new PrismaClient();
const app = express();

let port;
app.use(express.json());
// app.use(validateTodo); this will apply to all routes

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await client.taskItem.findMany();
    res.status(200).json({
      status: "success",
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "An error occured",
    });
  }
});

app.get("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  // validate taskId
  try {
    const task = await client.taskItem.findFirst({
      where: { id: taskId }, // findFirst is used to find a single record in the database which matches (taskId)
    });
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
      //This is optional, but it is a good practice to check if the task exists before sending the response.
      // if task is not found, we will send a 404 error
    }
    res.status(200).json({
      status: "success",
      message: "Task fetched successfully",
      data: task,
      //task- task found in the database when we findFirst
    });
  } catch (e) {
    res.stsus(500).json({
      status: "error",
      message: "An error occured",
    });
  }
});

app.post("/tasks", validateTodo, async (req, res) => {
  // you use array  [validateTodo, otherMiddleware ] if you have many middlewares,

  const { taskTitle, taskDescription } = req.body;
  try {
    const newTask = await client.taskItem.create({
      data: {
        taskTitle,
        taskDescription,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: newTask,
    });
  } catch (e) {
    res.status(500).json({
      message: "An error occured",
    });

    // LOGIC FOR ERROR HANDLING
    // SAVE IT TO A FILE OR DATABASE
    // SEND IT TO A MONITORING SERVICE
  }
});

app.patch("/tasks/:taskId", (req, res) => {
  res.send("Updating task with ID");
});
app.delete("/tasks/:taskId", (req, res) => {
  res.send("Deleting task with ID");
});

if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = 3000;
}
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
