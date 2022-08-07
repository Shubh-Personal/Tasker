const { UserModel } = require("../model/userModel");

const getAllUser = async () => {
  let users = await UserModel.find({});
  return users;
};

const saveUser = async ({ name, email, mobile, dateOfBirth, age }) => {
  let savedUser = await UserModel.create({
    name,
    email,
    mobile,
    dateOfBirth,
    age,
  });
  return savedUser;
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(512).json({ message: "userId not present" });
    } else {
      let user = await UserModel.removeById(req.params.id);

      if (user) {
        res.json({ user, message: "User deleted" });
      } else {
        res.json({ message: "user does not exist" });
      }
    }
  } catch (error) {
    console.error("Error", error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(412).json({ message: "id not found" });
    } else {
      let user = await UserModel.findById(id);
      if (!user) res.json({ message: "user not found" });

      let reqBody = req.body;
      Object.keys(reqBody).forEach((key) => {
        user[key] = reqBody[key];
      });

      let updatedUser = await user.save();
      res.json({ user: updatedUser, message: "User updated" });
    }
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(412).json({ message: "id not found" });
    } else {
      let user = await UserModel.findById(id);
      res.json({ data: user });
    }
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (email) => {
  try {
    if (!email) return null;
    else {
      let user = await UserModel.where("email").equals(email).limit(1);
      if (user.length > 0) return user[0];
      else return null;
    }
  } catch (error) {
    console.error("Error", error.message);
    return null;
  }
};
module.exports = {
  getAllUser,
  getUser,
  saveUser,
  deleteUser,
  updateUser,
  getUserByEmail,
};
