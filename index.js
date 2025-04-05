import express from "express";
import taskRouter from "./routes/tasksRouter.js";

const app = express();

app.use(express.json());
app.use("/tasks", taskRouter);
// app.get("/tasks/:taskId");
// app.post("/tasks", validateTodo);
// app.patch("/tasks/:taskId");
// app.delete("/tasks/:taskId");

export default app;
