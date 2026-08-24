let editing = false;
let currentTask = null;
let currentTaskId = null;

let input = document.querySelector(".input");
let button = document.querySelector(".btn");
let list = document.querySelector(".list");
let counter = document.querySelector(".counter");
let priority = document.querySelector(".priority");
let splash = document.querySelector(".splash");
let startBtn = document.querySelector(".start-btn");
let card = document.querySelector(".card");
let errorMessage = document.querySelector(".error-message");
let successMessage = document.querySelector("#success-message");

// =============================
// GET PRIORITY COLOR
// =============================

function getPriorityColor(selectedPriority) {
  if (selectedPriority === "High") {
    return "red";
  }

  if (selectedPriority === "Medium") {
    return "orange";
  }

  return "green";
}

// =============================
// ADD / UPDATE BUTTON
// =============================

button.addEventListener("click", async function () {
  if (input.value.trim() === "") {
    input.style.border = "2px solid red";

    errorMessage.textContent = "Please enter a task.";

    return;
  }

  // =============================
  // UPDATE TASK
  // =============================

  if (editing) {
    let taskText = input.value.trim();

    let selectedPriority = priority.value;

    let formData = new FormData();

    formData.append("id", currentTaskId);

    formData.append("task", taskText);

    formData.append("priority", selectedPriority);

    try {
      let response = await fetch("backend/update_todo.php", {
        method: "POST",
        body: formData,
      });

      let result = await response.text();

      if (result.trim() === "Task updated successfully") {
        currentTask.textContent = taskText;

        currentTask.style.color = getPriorityColor(selectedPriority);

        // Input clear
        input.value = "";

        input.style.border = "1px solid gray";

        errorMessage.textContent = "";

        // Reset editing
        editing = false;

        currentTask = null;

        currentTaskId = null;

        button.textContent = "Add";
      } else {
        errorMessage.textContent = result;
      }
    } catch (error) {
      errorMessage.textContent = "Unable to update task.";
    }

    return;
  }

  // =============================
  // ADD NEW TASK
  // =============================

  let taskText = input.value.trim();

  let selectedPriority = priority.value;

  let formData = new FormData();

  formData.append("task", taskText);

  formData.append("priority", selectedPriority);

  try {
    let response = await fetch("backend/add_todo.php", {
      method: "POST",
      body: formData,
    });

    let result = await response.text();

    if (result.trim() === "Task added successfully") {
      input.value = "";

      input.style.border = "1px solid gray";

      errorMessage.textContent = "";

      successMessage.textContent = "✓ Task added successfully!";

      successMessage.style.display = "block";
      successMessage.style.color = "#28a745";
      successMessage.style.fontSize = "14px";
      successMessage.style.fontWeight = "500";
      successMessage.style.textAlign = "center";
      successMessage.style.width = "320px";
      successMessage.style.margin = "10px auto 0 auto";
      successMessage.style.height = "20px";
      successMessage.style.lineHeight = "20px";
      successMessage.style.position = "static";
      successMessage.style.background = "transparent";

      setTimeout(function () {
        successMessage.style.display = "none";
      }, 2500);

      // Database se fresh data load
      await loadTodos();
    } else {
      errorMessage.textContent = result;
    }
  } catch (error) {
    errorMessage.textContent = "Unable to save task.";
  }
});

// =============================
// INPUT EVENT
// =============================

input.addEventListener("input", function () {
  input.style.border = "1px solid gray";

  errorMessage.textContent = "";
});

// =============================
// START BUTTON
// =============================

startBtn.addEventListener("click", function () {
  splash.classList.add("hide");

  card.classList.remove("hide");
});

// =============================
// LOAD TASKS FROM DATABASE
// =============================

async function loadTodos() {
  try {
    const response = await fetch("backend/get_todo.php");

    const todos = await response.json();

    // Old list clear
    list.innerHTML = "";

    todos.forEach(function (todo) {
      const taskText = todo.task;

      const taskId = todo.id;

      const taskPriority = todo.priority || "Low";

      // =============================
      // LI
      // =============================

      const li = document.createElement("li");

      // =============================
      // LEFT
      // =============================

      const left = document.createElement("div");

      left.classList.add("left");

      // =============================
      // PRIORITY CIRCLE
      // =============================

      const circle = document.createElement("span");

      circle.classList.add("priority-circle");

      circle.style.backgroundColor = getPriorityColor(taskPriority);

      // =============================
      // TASK
      // =============================

      const task = document.createElement("span");

      task.textContent = taskText;

      task.addEventListener("click", function () {
        task.classList.toggle("completed");
      });

      left.appendChild(circle);

      left.appendChild(task);

      li.appendChild(left);

      // =============================
      // ACTIONS
      // =============================

      const actions = document.createElement("div");

      actions.classList.add("actions");

      // =============================
      // EDIT BUTTON
      // =============================

      const edit = document.createElement("button");

      edit.innerHTML = '<i class="fa-solid fa-pen"></i>';

      edit.addEventListener("click", function () {
        input.value = task.textContent;

        // Priority select mein
        // database wali priority show
        priority.value = taskPriority;

        editing = true;

        currentTask = task;

        currentTaskId = taskId;

        button.textContent = "Update";

        input.focus();
      });

      // =============================
      // DELETE BUTTON
      // =============================

      const del = document.createElement("button");

      del.innerHTML = '<i class="fa-solid fa-trash"></i>';

      del.addEventListener("click", function () {
        showDeleteConfirmation(li, taskId);
      });

      actions.appendChild(edit);

      actions.appendChild(del);

      li.appendChild(actions);

      list.appendChild(li);
    });

    // Counter
    counter.textContent = "Total Tasks: " + list.children.length;
  } catch (error) {
    console.log("Error loading tasks:", error);
  }
}

// =============================
// DELETE CONFIRMATION
// =============================

function showDeleteConfirmation(li, taskId) {
  const confirmation = document.createElement("div");

  confirmation.style.position = "fixed";

  confirmation.style.top = "0";

  confirmation.style.left = "0";

  confirmation.style.width = "100vw";

  confirmation.style.height = "100vh";

  confirmation.style.backgroundColor = "rgba(0, 0, 0, 0.55)";

  confirmation.style.display = "flex";

  confirmation.style.justifyContent = "center";

  confirmation.style.alignItems = "center";

  confirmation.style.zIndex = "999999";

  const box = document.createElement("div");

  box.style.backgroundColor = "white";

  box.style.width = "320px";

  box.style.padding = "25px";

  box.style.borderRadius = "12px";

  box.style.boxSizing = "border-box";

  box.style.textAlign = "center";

  box.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";

  const heading = document.createElement("h3");

  heading.textContent = "Delete Task?";

  heading.style.color = "#222";

  heading.style.margin = "0 0 10px 0";

  const message = document.createElement("p");

  message.textContent = "Are you sure you want to delete this task?";

  message.style.color = "#555";

  message.style.margin = "0 0 20px 0";

  const buttons = document.createElement("div");

  buttons.style.display = "flex";

  buttons.style.justifyContent = "center";

  buttons.style.gap = "10px";

  const cancelButton = document.createElement("button");

  cancelButton.textContent = "Cancel";

  cancelButton.style.padding = "10px 20px";

  cancelButton.style.border = "none";

  cancelButton.style.borderRadius = "6px";

  cancelButton.style.backgroundColor = "#ddd";

  cancelButton.style.cursor = "pointer";

  const deleteButton = document.createElement("button");

  deleteButton.textContent = "Delete";

  deleteButton.style.padding = "10px 20px";

  deleteButton.style.border = "none";

  deleteButton.style.borderRadius = "6px";

  deleteButton.style.backgroundColor = "#dc3545";

  deleteButton.style.color = "white";

  deleteButton.style.cursor = "pointer";

  buttons.appendChild(cancelButton);

  buttons.appendChild(deleteButton);

  box.appendChild(heading);

  box.appendChild(message);

  box.appendChild(buttons);

  confirmation.appendChild(box);

  document.body.appendChild(confirmation);

  // CANCEL
  cancelButton.addEventListener("click", function () {
    confirmation.remove();
  });

  // DELETE
  deleteButton.addEventListener("click", async function () {
    let formData = new FormData();

    formData.append("id", taskId);

    try {
      let response = await fetch("backend/delete_todo.php", {
        method: "POST",
        body: formData,
      });

      let result = await response.text();

      if (result.trim() === "Task deleted successfully") {
        li.remove();

        counter.textContent = "Total Tasks: " + list.children.length;

        confirmation.remove();
      } else {
        errorMessage.textContent = result;

        confirmation.remove();
      }
    } catch (error) {
      errorMessage.textContent = "Unable to delete task.";

      confirmation.remove();
    }
  });
}

// =============================
// LOAD WHEN PAGE OPENS
// =============================

loadTodos();
