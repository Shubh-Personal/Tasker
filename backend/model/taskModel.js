const mongoose = require("mongoose");

const STATUS_ENUM = {
  "NOT STARTED": "NOT STARTED",
  WORKING: "WORKING",
  COMPLETED: "COMPLETED",
};
const taskSchema = new mongoose.Schema({
  NAME: {
    type: String,
    required: true,
    minLength: 1,
  },
  DESCRIPTION: {
    type: String,
  },
  ASSIGNED_TO: {
    type: [mongoose.Types.ObjectId],
  },
  CREATED_AT: {
    type: Date,
    default: () => Date.now(),
  },
  UPDATED_AT: {
    type: Date,
    default: () => Date.now(),
  },
  REMARK: {
    type: [
      {
        MESSAGE: String,
        SEND_DATE: {
          type: Date,
          default: () => Date.now(),
        },
        SENDER: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
      },
    ],
    required: false,
  },
  STATUS: {
    type: String,
    default: STATUS_ENUM["NOT STARTED"],
    validate: {
      validator: (val) => STATUS_ENUM[val.toUpperCase()] !== null,
      message: (props) =>
        `Status must be present in STATUS_ENUM and ${props} is not present in the STATUS_ENUM`,
    },
  },
  HOUSE_ID: {
    type: mongoose.Types.ObjectId,
    required: true,
    immutable: true,
  },
});

taskSchema.pre("save", async function (next) {
  let updatedStatus = this.STATUS;
  if (!STATUS_ENUM[updatedStatus]) {
    console.error("STATUS must be from defined status");
    this.invalidate("STATUS", "STATUS must be from defined status");
    next(new Error("STATUS must be from defined status"));
    return;
  }
  this.UPDATED_AT = () => Date.now();
  next();
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
