"use strict";

const API_URL = "http://127.0.0.1:3030/api/v1/todo/";
const container = document.getElementById("todoExampleContainer");

/**
 *
 * Add a TodoElement to the list
 */
function addTodo() {
  const newTodoItem = document.getElementById("todoInputText").value;

  //Check if the user submit empty new entry
  if (newTodoItem.length == 0) {
    alert("kein Text eingegeben!");
    return;
  }

  //create the data
  const data = {
    title: newTodoItem,
    erledigt: false,
  };

  //API request to add element
  (async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    render();
  })();
}

function setTodoState(id, isDone) {
  //create the data
  const data = {
    erledigt: isDone,
  };

  //API Patch element
  (async () => {
    const response = await fetch(API_URL + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    render();
  })();
}

function deleteTodo(id) {
  //API Patch element
  (async () => {
    const response = await fetch(API_URL + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    render();
  })();
}

//
// Render all elements
//
function render() {
  //clear erverything
  container.innerHTML = "";

  //Add search bar
  const addTodoEl = document.createElement("div");
  addTodoEl.innerHTML = `<p><input id="todoInputText">&nbsp;<button onClick=addTodo()>hinzufügen</button></p>`;
  container.appendChild(addTodoEl);

  //API request to add element
  (async () => {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    //Add Todolist
    const todoListEl = document.createElement("ul");
    for (let el of result) {
      const todoItemEl = document.createElement("li");
      if (el.erledigt) {
        todoItemEl.innerHTML = `<s>${el.title}</s> <button onClick=setTodoState("${el._id}",false)>nicht erledigt</button>&nbsp;<button onClick=deleteTodo("${el._id}")>löschen</button>`;
      } else {
        todoItemEl.innerHTML = `${el.title} <button onClick=setTodoState("${el._id}",true)>erledigt</button>&nbsp;<button onClick=deleteTodo("${el._id}")>löschen</button>`;
      }

      todoListEl.appendChild(todoItemEl);
    }
    container.appendChild(todoListEl);

    //Add refresh Button
    const refreshEl = document.createElement("p");
    refreshEl.innerHTML = `<button onClick=render()>Refresh</button>`;
    container.appendChild(refreshEl);
  })();
}

//Render the first time
render();
