const chatContainer = document.getElementById("chatExampleContainer");
const socket = io("ws://127.0.0.1:3030");
const app = feathers();
app.configure(feathers.socketio(socket));

//Add Msg
const addMsgEl = document.createElement("p");
addMsgEl.innerHTML = `<input id="chatInputText">&nbsp;<button onClick=addMsg()>absenden</button>`;
chatContainer.appendChild(addMsgEl);

//Add Empty list
const logListEl = document.createElement("ul");
chatContainer.appendChild(logListEl);

function addMsg() {
  const chatMsg = document.getElementById("chatInputText").value;

  //Check if the user submit empty new entry
  if (chatMsg.length == 0) {
    alert("kein Text eingegeben!");
    return;
  }

  //Add Msg
  app.service("/api/v1/msg").create({
    nachricht: chatMsg,
  });

  document.getElementById("chatInputText").value = "";
}

function addLog(message, operation) {
  const newLog = document.createElement("li");
  newLog.innerHTML = operation + ": " + message.nachricht;
  logListEl.appendChild(newLog);
}

// Set Realtime Eventhandler
app
  .service("/api/v1/msg")
  .on("created", (message) => addLog(message, "CREATE"));

app
  .service("/api/v1/msg")
  .on("patched", (message) => addLog(message, "UPDATE"));

app
  .service("/api/v1/msg")
  .on("removed", (message) => addLog(message, "DELETE"));
