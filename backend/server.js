const express = require("express");
const morgan = require("morgan");
const { DEV_ENV } = require("./constants");
const logger = require("./middleware/authenticator");

require("dotenv").config({ path: DEV_ENV });

const dbConnection = require("./db");

const userRoute = require("./routes/user");
const houseRoutes = require("./routes/house");

const app = express();
app.use(logger({ loginRequired: true }));
app.use(morgan("tiny"));
app.use(express.json());

app.use("/user", userRoute);
app.use("/house", houseRoutes);
dbConnection();
const PORT = process.env.PORT || 3000;

app.get("/*", (req, res) => {
  res.status(404).json({ message: "Page not found!", status: 404 });
});

app.listen(PORT, console.log(`Server started at ${PORT}`));
