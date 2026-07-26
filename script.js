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

button.addEventListener("click", function(){


if(input.value.trim()==""){
   alert("Enter a task")
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

   editing = false;
   button.textContent = "Add";
   input.value = "";

}

else{

let li = document.createElement("li")
let task = document.createElement("span")
let selectedPriority = priority.value;
if (selectedPriority == "High") {
 task.style.color ="red";
}
else if (selectedPriority == "Medium") {
 task.style.color ="orange";
}
else {
 task.style.color ="green";

}
task.textContent = input.value.trim();
task.addEventListener("click",function(){
   task.classList.toggle("completed");
})

li.appendChild(task);


let del = document.createElement("button")
del.textContent = "Delete";


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
edit.textContent = "Edit";


edit.addEventListener("click", function(){

   input.value = task.textContent;

   editing = true;
   currentTask = task;
   button.textContent = "Update";

});


li.appendChild(del);
li.appendChild(edit);

list.appendChild(li);
counter.textContent = "Total Tasks: " + list.children.length;

input.value = "";

}

});
input.addEventListener("keydown", function(e){
if(e.key=="Enter"){
button.click();

}


});
startBtn.addEventListener("click", function(){

    splash.classList.add("hide");

    card.classList.remove("hide");

});

