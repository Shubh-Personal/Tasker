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
  OWNER: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
    immutable: true,
  },
});

houseSchema.statics.findHouseByOwner = async function (id) {
  try {
    let house = await this.find({ OWNER: id });
    return house;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const houseModel = mongoose.model("House", houseSchema);

module.exports = { houseModel };
