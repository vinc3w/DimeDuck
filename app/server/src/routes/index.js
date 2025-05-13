module.exports = app => {
  app.use("/auth", require("./auth"));
  app.use("/users", require("./users"));
  app.use("/expenses", require("./expenses"));
  app.use("/budget", require("./budget"));
  app.use("/settings", require("./settings"));
  app.use("/dashboard", require("./dashboard"));
};
