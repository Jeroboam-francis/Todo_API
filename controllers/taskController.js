import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
export const getAllTask = async (_req, res) => {
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
};

export const createTask = async (req, res) => {
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
  }
};
export const getSpecificTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await client.taskItem.findFirst({
      where: { id: taskId },
    });
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Task fetched successfully",
      data: task,
    });
  } catch (e) {
    res.stsus(500).json({
      status: "error",
      message: "An error occured",
    });
  }
};

export const updateTask = async (req, res) => {
  const { taskTitle, taskDescription, isComplete } = req.body;
  const { taskId } = req.params;
  try {
    const updatedTask = await client.taskItem.update({
      where: {
        id: taskId,
      },
      data: {
        taskTitle: taskTitle && taskTitle,
        taskDescription: taskDescription && taskDescription,
        isComplete: isComplete && isComplete,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "An error occured",
    });
  }
};
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  // validate taskId
  try {
    await client.taskItem.delete({
      where: {
        id: taskId,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "An error occured",
    });
  }
};
