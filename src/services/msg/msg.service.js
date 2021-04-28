// Initializes the `msg` service on path `/api/v1/msg`
const { Msg } = require("./msg.class");
const createModel = require("../../models/msg.model");
const hooks = require("./msg.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use("/api/v1/msg", new Msg(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("/api/v1/msg");

  service.hooks(hooks);
};
