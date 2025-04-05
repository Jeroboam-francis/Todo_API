import { Router } from "express";

import validateTodo from "../middleware/validateTodo.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getSpecificTask,
  updateTask,
} from "../controllers/taskController.js";

const router = Router();
router.route("/").get(getAllTask).post(validateTodo, createTask);
router
  .route("/:taskId")
  .get(getSpecificTask)
  .patch(updateTask)
  .delete(deleteTask);
export default router;
