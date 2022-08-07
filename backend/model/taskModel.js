const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const taskSchema = new Schema({
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
    type: {
      MESSAGE: String,
      SEND_DATE: {
        type: Date,
        default: () => Date.now(),
      },
      SENDER: {
        type: mongoose.types.ObjectId,
        required: true,
      },
    },
  },
});
