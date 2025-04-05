function validateTodo(req, res, next) {
  const { taskTitle, taskDescription } = req.body;

  if (!taskTitle || !taskDescription) {
    return res
      .status(400)
      .json({ status: "error", message: "Title is required" });
  }
  if (!taskDescription) {
    return res
      .status(400)
      .json({ status: "error", message: "Description is required" });
  }

  //   if (typeof taskTitle !== "string" || typeof taskDescription !== "string") {
  //     return res
  //       .status(400)
  //       .json({ error: "Title and description must be strings" });
  //   }

  next();
}
export default validateTodo;
