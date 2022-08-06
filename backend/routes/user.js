const express = require("express");
const {
  getAllUser,
  saveUser,
  deleteUser,
  updateUser,
  getUser,
} = require("../controller/user");
const route = express.Router();

route.get("/", async (req, res) => {
  const users = await getAllUser();
  res.json({ users });
});

route.post("/", async (req, res) => {
  if (!req.body) {
    res.status(202).json({ message: "Client data not receieved" });
  } else {
    const user = req.body;
    try {
      let savedUser = await saveUser(user);
      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

route.delete("/:id", deleteUser);

route.put("/:id", updateUser);

route.get("/:id", getUser);

module.exports = route;
