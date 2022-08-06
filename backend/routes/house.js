const { getAllHouses, saveHouse } = require("../controller/house");
const houseRoutes = require("express").Router();

houseRoutes.get("/", getAllHouses);
houseRoutes.post("/", saveHouse);

module.exports = houseRoutes;
