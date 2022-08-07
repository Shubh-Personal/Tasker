const TaskModel = require("../model/taskModel");
const { houseModel } = require("../model/houseModel");

const createTask = async (req, res) => {
  try {
    let reqBody = req.body;
    if (!reqBody) {
      throw new Error("Task data not found!");
    } else {
      let returnData = await validateOwner(req.data._id, req.body.HOUSE_ID);
      console.log("Validate ", returnData);
      if (!returnData.error) {
        let savedTask = await TaskModel.create(reqBody);
        res
          .status(201)
          .json({ data: savedTask, message: `Task has been created` });
      } else {
        throw new Error(returnData.message);
      }
    }
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error.message) });
  }
};

const getAllTask = async (req, res) => {
  try {
    let allTask = await TaskModel.find({});
    if (allTask[0]) res.status(201).json({ Tasks: allTask });
    else throw new Error("No tasks found");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !req.body) throw new Error("Task data not provided");
    else {
      let oldTask = await TaskModel.findById(id);
      if (!oldTask) throw new Error("No task found");
      else {
        let returnData = await validateOwner(req.data._id, oldTask.HOUSE_ID);
        if (!returnData.error) {
          Object.keys(req.body).forEach((element) => {
            oldTask[element] = req.body[element];
          });
          let task = await oldTask.save();
          res.status(200).json({ message: "Task updated success", data: task });
        } else {
          throw new Error(returnData.message);
        }
      }
    }
  } catch (error) {
    console.error("CONTROLLER ERROR", error.message);
    res.status(500).json({ message: error.message, error: true });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) throw new Error("Task Id not provided");
    else {
      let taskDetails = await TaskModel.findById(taskId);
      if (taskDetails) {
        const resultData = await validateOwner(
          req.data._id,
          taskDetails.HOUSE_ID
        );
        console.log("validate", resultData);
        if (!resultData.error) {
          let deleted = await taskDetails.remove();
          res.json({ data: deleted, message: `Task deleted successfully` });
        } else {
          throw new Error(resultData.message);
        }
      } else {
        throw new Error("Task not found");
      }
    }
  } catch (error) {
    console.error("Controller Error ", error.message);
    res.status(500).json({ message: error.message, error: true });
  }
};

const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Task id not provided");
    else {
      let task = await TaskModel.findById(id);
      if (task) {
        res.status(200).json({ task });
      } else {
        throw new Error("No task found!");
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !req.body) throw new Error("Task data not provided");
    else {
      let oldTask = await TaskModel.findById(id);

      if (!oldTask) throw new Error("No task found");
      else {
        let ret = await validateOwner(req.data._id, oldTask.HOUSE_ID);
        if (!ret.error) {
          oldTask.STATUS = req.body.STATUS;
          let task = await oldTask.save();
          res.status(200).json({ message: "Task updated success", data: task });
        } else {
          throw new Error(ret.message);
        }
      }
    }
  } catch (error) {
    console.error("CONTROLLER ERROR", error.message);
    res.status(500).json({ message: error.message, error: true });
  }
};

const addRemarks = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !req.body) throw new Error("Task data not provided");
    else {
      let oldTask = await TaskModel.findById(id);

      if (!oldTask) throw new Error("No task found");
      else {
        let ret = await validateOwner(req.data._id, oldTask.HOUSE_ID);
        if (!ret.error) {
          let remarks = oldTask.REMARK;
          let newRemark = {
            MESSAGE: req.body.MESSAGE,
            SENDER: req.data._id,
          };
          remarks = [...remarks, newRemark];
          oldTask.REMARK = remarks;
          let task = await oldTask.save();
          res.status(200).json({ message: "Remark added success", data: task });
        } else {
          throw new Error(ret.message);
        }
      }
    }
  } catch (error) {
    console.error("CONTROLLER ERROR", error.message);
    res.status(500).json({ message: error.message, error: true });
  }
};

const removeRemarks = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !req.body) throw new Error("Task data not provided");
    else {
      let oldTask = await TaskModel.findById(id);

      if (!oldTask) throw new Error("No task found");
      else {
        let ret = await validateOwner(req.data._id, oldTask.HOUSE_ID);
        if (!ret.error) {
          let remarks = oldTask.REMARK;

          remarks = remarks.filter(
            (remark) => String(remark._id) !== String(req.body.REMARK)
          );
          oldTask.REMARK = remarks;
          let task = await oldTask.save();
          res
            .status(200)
            .json({ message: "Remark removed success", data: task });
        } else {
          throw new Error(ret.message);
        }
      }
    }
  } catch (error) {
    console.error("CONTROLLER ERROR", error.message);
    res.status(500).json({ message: error.message, error: true });
  }
};
const validateOwner = async (userId, houseId) => {
  let houseData = await houseModel.findById(houseId);
  if (!houseData) {
    return { message: "House details not found!", error: true };
  } else {
    if (
      String(userId) === String(houseData.OWNER) ||
      houseData.HOUSEMATES.indexOf(userId) !== -1
    ) {
      return { error: false };
    } else {
      return { error: true, message: "Not allowed!" };
    }
  }
};

module.exports = {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskStatus,
  addRemarks,
  removeRemarks,
};
