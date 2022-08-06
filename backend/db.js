const mongoose = require("mongoose");
const { DEV_ENV } = require("./constants");
require("dotenv").config({ path: DEV_ENV });

const mongoUrl = process.env.DATABSE_URL || "";

let dbConnection = () => {
  if (mongoUrl) {
    mongoose
      .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`connnected to db`);
      })
      .catch((err) => {
        console.log("DB ERROR", err.message);
      });
  } else {
    process.exit(1);
  }
};
module.exports = dbConnection;
