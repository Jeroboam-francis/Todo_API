import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

let port;
app.use(express.json());

app.get("/tasks", (req, res) => {
  res.send("Getting all tasks");
});

app.get("/tasks/:taskId", (req, res) => {
  res.send("Getting task with ID");
});

app.post("/tasks", async (req, res) => {
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
