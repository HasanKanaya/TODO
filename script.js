let input = document.querySelector("input.form-control");
let addButton = document.querySelector("Button.add");
let clearButton = document.querySelector("Button.clear");
let box = document.querySelector(".shape");
let tasks = [];

addButton.addEventListener("click", function () {
  if (input.value !== "") {
    addToArray(input.value);
    input.value = "";
  }
});

clearButton.addEventListener("click", function () {
  swal({
    title: "Are you sure?",
    text: "All your tasks will be delete it !!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("All Your tasks have been delete it. Reload the page please", {
        icon: "success",
      });
      window.localStorage.clear();
      // location.reload();
    } else {
      swal("Your tasks have not been delete it");
    }
  });
});

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocal();

function addDataToLocal(tasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

box.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function getDataFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElement(tasks);
  }
}

function addToArray(text) {
  let task = {
    id: Date.now(),
    title: text,
    stute: false,
  };

  tasks.push(task);
  addElement(tasks);
  addDataToLocal(tasks);
}

function addElement(x) {
  box.innerHTML = "";
  x.forEach((task) => {
    let div = document.createElement("div");
    div.setAttribute(
      "class",
      "task my-3 d-flex justify-content-between align-items-center"
    );

    let divText = document.createElement("div");
    divText.setAttribute("class", "text lead");
    if (task.stute) {
      divText.className = "done text lead";
    }
    div.setAttribute("data-id", task.id);
    divText.appendChild(document.createTextNode(task.title));
    div.appendChild(divText);
    let delButton = document.createElement("button");
    delButton.className = "btn btn-outline-secondary px-sm-4 px-3 del";
    delButton.setAttribute("type", "button");
    delButton.appendChild(document.createTextNode("Delete"));
    div.appendChild(delButton);
    box.appendChild(div);
  });
}

function deleteTaskWith(taskId) {
  tasks = tasks.filter((task) => task.id != taskId);
  addDataToLocal(tasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      tasks[i].stutue == false
        ? (tasks[i].stutue = true)
        : (tasks[i].stutue = false);
    }
  }
  addDataToLocal(tasks);
}
