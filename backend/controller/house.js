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
      const owner = req.data._id;
      const houseData = {
        NAME: name,
        ADDRESS: address,
        HOUSEMATES: housemates,
        OWNER: owner,
      };
      const savedHouseData = await houseModel.create(houseData);
      res
        .status(201)
        .json({ data: savedHouseData, message: "house created success" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findHouseByOwner = async (req, res) => {
  try {
    let house = (await houseModel.findHouseByOwner(req.data._id)) || [];
    if (house[0]) {
      res.status(200).json({ house });
    } else {
      res.json({ message: "No houses found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateHouse = async (req, res) => {
  try {
    let houseId = req.params.id;
    if (!houseId) {
      throw new Error("house input data missing!");
    } else {
      let house = await houseModel.findById(houseId);
      if (!house) {
        throw new Error("No house found!");
      } else {
        if (String(house.OWNER) === String(req.data._id)) {
          Object.keys(req.body).forEach((key) => {
            house[key] = req.body[key];
          });
          let updatedHouse = await house.save();
          res.status(200).json({
            message: `House data updated successfully`,
            data: updatedHouse,
          });
        } else {
          res.status(201).json({ message: "Not allowed" });
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const addHouseMates = async (req, res) => {
  try {
    let houseId = req.params.id;
    if (!houseId) {
      throw new Error("house input data missing!");
    } else {
      let house = await houseModel.findById(houseId);
      if (!house) {
        throw new Error("No house found!");
      } else {
        if (String(house.OWNER) === String(req.data._id)) {
          let houseMates = house.HOUSEMATES;
          let newHouseMates = req.body.HOUSEMATES;
          if (newHouseMates[0]) {
            let newHouseMateList = newHouseMates.filter(
              (mate) => houseMates.indexOf(mate) === -1
            );
            let allHouseMates = [...houseMates, ...newHouseMateList];
            house.HOUSEMATES = allHouseMates;
            let updatedHouse = await house.save();
            res.status(200).json({
              message: `Housemates added successfully`,
              data: updatedHouse,
            });
          } else throw new Error("No new member provided");
        } else {
          res.status(201).json({ message: "Not allowed" });
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const removeHouseMates = async (req, res) => {
  try {
    let houseId = req.params.id;
    if (!houseId) {
      throw new Error("house input data missing!");
    } else {
      let house = await houseModel.findById(houseId);
      if (!house) {
        throw new Error("No house found!");
      } else {
        if (String(house.OWNER) === String(req.data._id)) {
          let houseMates = house.HOUSEMATES;
          let toBeRemovedHouseMates = req.body.HOUSEMATES;
          if (toBeRemovedHouseMates[0]) {
            let newHouseMateList = houseMates.filter(
              (mate) => toBeRemovedHouseMates.indexOf(mate) !== -1
            );
            house.HOUSEMATES = newHouseMateList;
            let updatedHouse = await house.save();
            res.status(200).json({
              message: `Housemates removed successfully`,
              data: updatedHouse,
            });
          } else throw new Error("No new member provided");
        } else {
          res.status(201).json({ message: "Not allowed" });
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getHouseById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Input data missing!");
    else {
      const data = await houseModel.findById(id);
      if (data) {
        res.status(200).json({ house: data });
      } else {
        throw new Error("No house found");
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message, error: true });
  }
};
const inputDataError = (res) => {
  res.status(401).json({ message: "Missing input data!" });
};

module.exports = {
  getAllHouses,
  saveHouse,
  findHouseByOwner,
  updateHouse,
  addHouseMates,
  removeHouseMates,
  getHouseById,
};
