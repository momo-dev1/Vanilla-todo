let input = document.getElementById("itemInput");
let addButton = document.getElementById("addButton");
let todoList = document.getElementById("todoList");
let clearListBtn = document.getElementById("clearButton");

let listArray = [];

if (localStorage.getItem("tasks")) {
  const data = window.localStorage.getItem("tasks");
  listArray = JSON.parse(data);
}
getTasksFromLocalStorage();

clearListBtn.addEventListener("click", () => {
  localStorage.removeItem("tasks");
  location.reload();
});
addButton.addEventListener("click", () => {
  if (input.value === "") return;

  addTaskToArray(input.value);
  input.value = "";
});

function addTaskToArray(taskTitle) {
  const task = {
    id: Date.now(),
    title: taskTitle,
    done: false,
  };
  listArray.push(task);
  AddElementToPage(listArray);
  seTasksToLocalStorage(listArray);
}

function AddElementToPage(listArray) {
  todoList.innerHTML = "";

  listArray.forEach((task) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.setAttribute("data-id", task.id);

    const div = document.createElement("div");
    if (task.done) {
      li.className = "todo-item done";
    }
    //content
    const h3 = document.createElement("h3");
    h3.textContent = task.title;

    //deleteBtn
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "delete";

    //completeBtn
    const complete = document.createElement("button");
    complete.className = "complete";
    complete.textContent = "complete";

    div.append(complete, deleteBtn);
    li.append(h3, div);
    todoList.appendChild(li);
  });
}

todoList.addEventListener("click", (e) => {
  let id = e.target.parentElement.parentElement.getAttribute("data-id");
  if (e.target.classList.contains("delete")) {
    deleteTask(id);
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.classList.contains("complete")) {
    e.target.parentElement.parentElement.classList.toggle("done");

    completeTask(id);
  }
});

function seTasksToLocalStorage(listArray) {
  window.localStorage.setItem("tasks", JSON.stringify(listArray));
}

function getTasksFromLocalStorage() {
  const data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    AddElementToPage(tasks);
  }
}

function deleteTask(id) {
  listArray = listArray.filter((taskItem) => taskItem.id !== +id);
  seTasksToLocalStorage(listArray);
}

function completeTask(id) {
  for (let i = 0; i < listArray.length; i++) {
    if (listArray[i].id == id) {
      listArray[i].done == false
        ? (listArray[i].done = true)
        : (listArray[i].done = false);
    }
  }

  seTasksToLocalStorage(listArray);
}
