const {
  getAllHouses,
  saveHouse,
  findHouseByOwner,
  updateHouse,
  addHouseMates,
  removeHouseMates,
  getHouseById,
} = require("../controller/house");

const authorize = require("../middleware/authorize");
const houseRoutes = require("express").Router();

houseRoutes.get("/", getAllHouses);
houseRoutes.post("/", saveHouse);
houseRoutes.put("/:id", updateHouse);
houseRoutes.put("/housemate/:id", addHouseMates);
houseRoutes.delete("/housemate/:id", removeHouseMates);
houseRoutes.get("/my-houses", findHouseByOwner);
houseRoutes.get("/:id", getHouseById);

module.exports = houseRoutes;
