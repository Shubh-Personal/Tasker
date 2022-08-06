const { getUserByEmail } = require("../controller/user");

module.exports = (option) => {
  return function (req, res, next) {
    let savedUserId = {};

    const allowedUrl = ["/", "/guest", "/discover", "/about"];
    // console.log(allowedUrl.indexOf);
    if (allowedUrl.indexOf(req.url) !== -1 || option.off) {
      next();
      return;
    }
    if (validateToken(req)) {
      req.user.email = req.headers["authentication"];
      let loggedInUser = getUserByEmail(req, res);
      if (loggedInUser.data) {
        req.user = loggedInUser.data;
        next();
        return;
      } else {
        res.status(500).json({ message: "Something went wrong!" });
        return;
      }
      return;
    } else {
      res.status(401).json({ message: "Please login again" });
    }
  };
  function validateToken(req) {
    let token = req.headers["authentication"];
    if (token === "shubh@mail.com") return true;
    else return false;
  }
};
