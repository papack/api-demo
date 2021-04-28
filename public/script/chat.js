var socket = io("http://127.0.0.1:3030");
// @feathersjs/client is exposed as the `feathers` global.
var app = feathers();

// Set up Socket.io client with the socket
app.configure(feathers.socketio(socket));

// Receive real-time events through Socket.io
app
  .service("/api/v1/msg")
  .on("created", (message) => console.log("New message created", message));

app
  .service("/api/v1/msg")
  .on("patched", (message) => console.log("message patched", message));

app
  .service("/api/v1/msg")
  .on("removed", (message) => console.log("message deleted", message));
