module.exports = (app) => {
  app.use(`/employee`, require("./employee.route"));
  app.use(`/auth`, require("./user.route"));
};
