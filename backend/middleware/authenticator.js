const { getUserByEmail } = require("../controller/user");

module.exports = (option) => {
  return async function (req, res, next) {
    let savedUserId = {};

    const allowedUrl = ["/", "/guest", "/discover", "/about"];

    if (
      allowedUrl.indexOf(req.url) !== -1 ||
      option.off ||
      (req.url === "/user" && req.method === "POST")
    ) {
      next();
      return;
    }
    if (validateToken(req)) {
      let loggedInUser = await getUserByEmail(req.headers["authentication"]);
      if (loggedInUser) {
        req.data = loggedInUser;
        next();
      } else {
        res.status(500).json({ message: "Something went wrong!" });
      }
      return;
    } else {
      res.status(401).json({ message: "Please login again" });
    }
  };
  function validateToken(req) {
    let token = req.headers["authentication"];
    if (token === "shubh@mail.com" || token === "sdsd@mail.com") return true;
    else return false;
  }
};
