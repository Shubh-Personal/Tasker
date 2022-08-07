module.exports = (authorizedPersons) => {
  return function (req, res, next) {
    if (authorizedPersons.length > 0) {
      if (authorizedPersons.indexOf(req.data._id) !== -1) {
        next();
      } else {
        res.status(401).json({ message: "You are not allowed!" });
      }
    } else {
      res.status(401).json({ message: "Please try again" });
    }
  };
};
