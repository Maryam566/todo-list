let editing = false;
let currentTask = null;

let input = document.querySelector(".input")
let button = document.querySelector(".btn")
let list = document.querySelector(".list")
let counter=document.querySelector(".counter")
let priority=document.querySelector(".priority")
let splash=document.querySelector(".splash")
let startBtn = document.querySelector(".start-btn")
let card = document.querySelector(".card")
let errorMessage = document.querySelector(".error-message");


button.addEventListener("click", function(){


if(input.value.trim()==""){
     input.style.border = "2px solid red";
   errorMessage.textContent = "Please enter a task.";

   return;
}

else if(editing){
   let selectedPriority = priority.value;
   if (selectedPriority == "High") {
 currentTask.style.color ="red";
}
else if (selectedPriority == "Medium") {
 currentTask.style.color ="orange";
}
else {
 currentTask.style.color ="green";

}

   currentTask.textContent =input.value.trim();
   input.style.border = "1px solid gray";
errorMessage.textContent = "";

   editing = false;
   button.textContent = "Add";
   input.value = "";

}

else{

let li = document.createElement("li")
let circle = document.createElement("span");
circle.classList.add("priority-circle");
let left = document.createElement("div");
left.classList.add("left");
let task = document.createElement("span")
let actions = document.createElement("div");
actions.classList.add("actions");

let selectedPriority = priority.value;
if (selectedPriority == "High") {
  circle.style.backgroundColor = "red";
}
else if (selectedPriority == "Medium") {
circle.style.backgroundColor ="orange";
}
else {
 circle.style.backgroundColor ="green";

}
task.textContent = input.value.trim();
task.addEventListener("click",function(){
   task.classList.toggle("completed");
})
left.appendChild(circle);
left.appendChild(task);

li.appendChild(left);

let del = document.createElement("button")
del.innerHTML = '<i class="fa-solid fa-trash"></i>';


del.addEventListener("click", function(){

  
if(confirm("Are you sure")){
    if(currentTask === task){
      editing = false;
      button.textContent = "Add";
      input.value = "";
   }
 li.remove();
   counter.textContent = "Total Tasks: " + list.children.length;
}
 
});


let edit = document.createElement("button")
edit.innerHTML = '<i class="fa-solid fa-pen"></i>';


edit.addEventListener("click", function(){

   input.value = task.textContent;

   editing = true;
   currentTask = task;
   button.textContent = "Update";

});
actions.appendChild(edit);
actions.appendChild(del);

li.appendChild(actions);
list.appendChild(li);
counter.textContent = "Total Tasks: " + list.children.length;
input.style.border = "1px solid gray";
errorMessage.textContent = "";

input.value = "";

}

});
input.addEventListener("keydown", function(e){
if(e.key=="Enter"){
button.click();

}


});
input.addEventListener("input", function(){

    input.style.border = "1px solid gray";
    errorMessage.textContent = "";

});
startBtn.addEventListener("click", function(){

    splash.classList.add("hide");

    card.classList.remove("hide");

});


