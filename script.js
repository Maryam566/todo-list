let editing = false;
let currentTask = null;
let a = document.querySelector(".input")
let b = document.querySelector(".btn")
let c = document.querySelector(".list")
b.addEventListener("click", function () {
   if (a.value.trim() == "") {
      alert("Please enter a task");
   }
   else if (editing) {
      currentTask.textContent = a.value.trim();
      editing = false;
      b.textContent = "Add";
      a.value = "";
   }
   else {

      let li = document.createElement("li");
      let task = document.createElement("span");
      task.textContent = a.value.trim();
      li.appendChild(task);
      let edit = document.createElement("button")
      edit.textContent = "Edit";
      edit.addEventListener("click", function () {
         a.value = task.textContent;

         editing = true;
         currentTask = task;
         b.textContent = "Update";
      });
      let del = document.createElement("button");
      del.textContent = "Delete";
      del.addEventListener("click", function () {
         if (currentTask === task) {
            editing = false;
            b.textContent = "Add";
            a.value = "";
         }
         li.remove();
      });
      li.appendChild(edit);
      li.appendChild(del);
      c.appendChild(li);
      a.value = "";
   }

});


