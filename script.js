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
  if (localStorage.getItem("language") == "ar") {
    swal({
      title: "هل انت متأكد",
      text: "!!جميع المهام سوف يتم حذفهم ",
      icon: "warning",
      buttons: ["كلا", "نعم"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("جميع المهام تم حذفهم,اعد تحميل الصفحة", {
          icon: "success",
          buttons: ["نعم"],
        });
        window.localStorage.clear();
        localStorage.setItem("language", "ar");
      } else {
        swal("لم يتم حذف المهام", {
          icon: "success",
          buttons: ["نعم"],
        });
      }
    });
  } else {
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
        localStorage.setItem("language", "en");
      } else {
        swal("Your tasks have not been delete it");
      }
    });
  }
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
    if (localStorage.getItem("language") == "ar") {
      delButton.className = "btn btn-outline-secondary px-sm-4 px-3 del btnAr";
      delButton.appendChild(document.createTextNode("حذف"));
    } else {
      delButton.className = "btn btn-outline-secondary px-sm-4 px-3 del";
      delButton.appendChild(document.createTextNode("Delete"));
    }
    delButton.setAttribute("type", "button");
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

// Settings
// Language

// Local Storage
if (localStorage.getItem("language") != null) {
  let langInput = document.querySelector(".input-group .form-control");
  let allButtons = document.querySelectorAll(".btn");
  let inputButtons = document.querySelectorAll(".input-group button");
  if (localStorage.getItem("language") == "ar") {
    allButtons.forEach((e) => {
      e.classList.add("btnAr");
      e.innerHTML = "حذف";
    });
    document.body.classList.add("arText");
    langInput.classList.add("arText");
    langInput.setAttribute("placeholder", "اضافة مهمة جديدة");
    inputButtons[0].innerHTML = "اضافة";
    inputButtons[1].innerHTML = "حذف";
    document.querySelector(".settings").innerHTML = "اعدادات";
  } else {
    allButtons.forEach((e) => {
      e.classList.remove("btnAr");
      e.innerHTML = "Delete";
    });
    document.body.classList.remove("arText");
    langInput.classList.remove("arText");
    langInput.setAttribute("placeholder", "Add a new task");
    inputButtons[0].innerHTML = "Add";
    inputButtons[1].innerHTML = "Clear";
    document.querySelector(".settings").innerHTML = "Settings";
  }
}
// Local Storage
let lang = document.querySelectorAll(".language p");
let langInput = document.querySelector(".input-group .form-control");
let allButtons = document.querySelectorAll(".btn");
let inputButtons = document.querySelectorAll(".input-group button");
lang[1].addEventListener("click", () => {
  localStorage.setItem("language", "ar");
  allButtons.forEach((e) => {
    e.classList.add("btnAr");
    e.innerHTML = "حذف";
  });
  document.body.classList.add("arText");
  langInput.classList.add("arText");
  langInput.setAttribute("placeholder", "اضافة مهمة جديدة");
  inputButtons[0].innerHTML = "اضافة";
  inputButtons[1].innerHTML = "حذف";
  document.querySelector(".settings").innerHTML = "اعدادات";
  location.reload();
});

lang[0].addEventListener("click", () => {
  localStorage.setItem("language", "en");
  allButtons.forEach((e) => {
    e.classList.remove("btnAr");
    e.innerHTML = "Delete";
  });
  document.body.classList.remove("arText");
  langInput.classList.remove("arText");
  langInput.setAttribute("placeholder", "Add a new task");
  inputButtons[0].innerHTML = "Add";
  inputButtons[1].innerHTML = "Clear";
  document.querySelector(".settings").innerHTML = "Settings";
  location.reload();
});
// Language

// Settings
