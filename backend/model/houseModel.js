var mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  NAME: {
    type: String,
  },
  ADDRESS: {
    type: String,
    required: true,
  },
  HOUSEMATES: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  OWENER: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const houseModel = mongoose.model("House", houseSchema);

module.exports = { houseModel };
