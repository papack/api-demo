// Initializes the `todo` service on path `/api/v1/todo`
const { Todo } = require("./todo.class");
const createModel = require("../../models/todo.model");
const hooks = require("./todo.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use("/api/v1/todo", new Todo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("/api/v1/todo");

  service.hooks(hooks);
};
