// selectors 
const todoInput = document . querySelector(".todo_input");
const todoButton = document . querySelector(".todo_button");
const todoList = document . querySelector(".todo_list");
const filterOption = document.querySelector(".filter-todo");

// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click" , deleteCheck);
filterOption.addEventListener("click" , filterTodo);

// functions
function addTodo(event){
    // prevent form from submitting
    event.preventDefault();
    if(todoInput.value=="")
        return alert("Fill Your Task")
    // create todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create list
    const newTodo = document.createElement("li");
    newTodo.innerText= todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodo(todoInput.value);
    // check mark button
    const completedButton= document.createElement("button");
    completedButton.innerHTML='<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // check trust button
    const trashButton= document.createElement("button");
    trashButton.innerHTML='<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    // clear input value
    todoInput.value="";
}

function deleteCheck(e){
    const item = e.target;
    // delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        //at the end
        removeLocalTodo(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }
    // check todo
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
             todo.style.display ="flex";
                break;
            case "completed":
          if(todo.classList.contains("completed")){
            todo.style.display = "flex";
          }
          else{
            todo.style.display ="none";
          }
          break;
            case "uncompleted":
         if(! todo.classList.contains("completed")){
              todo.style.display = "flex";
          }
          else{
              todo.style.display ="none";
          }
          break;
        }
    });
}

function saveLocalTodo(todo){
    // check---hey do i have already things in there ?
    let todos;
    if(localStorage.getItem("todos")===null){
        todos =[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function removeLocalTodo(todo){
    // check---hey do i have already things in there ?
    let todos;
    if(localStorage.getItem("todos")===null){
        todos =[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    console.log(todo.children);
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    // console.log("hello");
     // check---hey do i have already things in there ?
     let todos;
     if(localStorage.getItem("todos")===null){
         todos =[];
     }
     else{
         todos = JSON.parse(localStorage.getItem("todos"));
     }
     todos.forEach(function(todo){
           // create todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create list
    const newTodo = document.createElement("li");
    newTodo.innerText= todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
  
    // check mark button
    const completedButton= document.createElement("button");
    completedButton.innerHTML='<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // check trust button
    const trashButton= document.createElement("button");
    trashButton.innerHTML='<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
     });
}


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal('.header-todo')
sr.reveal('.todo_buttons',{delay:550})
sr.reveal('.select' ,{delay: 700 })
sr.reveal('.todo_container' , {interval: 100, delay : 700 })
