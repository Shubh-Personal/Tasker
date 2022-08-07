const {
  getAllHouses,
  saveHouse,
  findHouseByOwner,
  updateHouse,
  addHouseMates,
  removeHouseMates,
} = require("../controller/house");
const authorize = require("../middleware/authorize");
const houseRoutes = require("express").Router();

houseRoutes.get("/", getAllHouses);
houseRoutes.post("/", saveHouse);
houseRoutes.put("/:id", updateHouse);
houseRoutes.put("/housemate/:id", addHouseMates);
houseRoutes.delete("/housemate/:id", removeHouseMates);
houseRoutes.get("/my-houses", findHouseByOwner);

module.exports = houseRoutes;
