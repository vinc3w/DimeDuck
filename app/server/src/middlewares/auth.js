const User = require("@models/user");

module.exports = async (req, res, next) => {
  const userId = req.headers.authorization.split(" ")[1];
  const user = await User.findById(userId);
  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.state(403).send({ message: "Not authorized" });
  }
}
