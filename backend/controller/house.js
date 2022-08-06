const { houseModel } = require("../model/houseModel");

const getAllHouses = async (req, res) => {
  try {
    const data = await houseModel.find({});
    res.status(200).json({ houses: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const saveHouse = async (req, res) => {
  try {
    if (!req.body) {
      inputDataError(res);
    } else {
      const { name, address, housemates } = req.body;
      const owner = req.user._id;
      const houseData = { name, address, housemates, owner };
      const savedHouseData = await houseModel.create(houseData);
      res
        .json(201)
        .json({ data: savedHouseData, message: "house created success" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const inputDataError = (res) => {
  res.status(401).json({ message: "Missing input data!" });
};
module.exports = { getAllHouses, saveHouse };
