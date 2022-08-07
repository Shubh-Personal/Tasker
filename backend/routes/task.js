const { PARTICIPANTS, HOUSEMATES, OWNER } = require("../constants");
const {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskStatus,
  addRemarks,
  removeRemarks,
} = require("../controller/task");
const authorize = require("../middleware/authorize");

const taskRoutes = require("express").Router();

taskRoutes.get("/", getAllTask);
taskRoutes.get("/:id", getTaskById);
taskRoutes.post("/", createTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);
taskRoutes.put("/status/:id", updateTaskStatus);
taskRoutes.post("/remarks/:id", addRemarks);
taskRoutes.delete("/remarks/:id", removeRemarks);

module.exports = taskRoutes;
