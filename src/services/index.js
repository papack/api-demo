const msg = require("./msg/msg.service.js");
const todo = require("./todo/todo.service.js");
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(msg);
  app.configure(todo);
};
