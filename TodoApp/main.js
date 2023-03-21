window.addEventListener("load", () => {
   todo = JSON.parse(localStorage.getItem("todoList")) || [];
  const form = document.querySelector(".input-part");
  const input = document.querySelector("#input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputContent = input.value;
    if (!inputContent) {
      alert("Input cannot be empty");
      return;
    }
    todoItem = {
      content: e.target.elements.content.value,
      done: false,
      createdAt: new Date().getTime(),
    };
    todo.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(todo));

    e.target.reset();

    DisplayTodos();
  });
  DisplayTodos();
});
function DisplayTodos() {
  const item = document.querySelector(".items");
  item.innerHTML = "";

  todo.forEach((todoItem) => {
    const todoFirst = document.createElement("div");
    todoFirst.classList.add("todo-item");

    const inputItem = document.createElement("div");
    inputItem.classList.add("input-items");

    todoFirst.appendChild(inputItem);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.done;
    checkbox.classList.add("todo-completed");

    const inputTab = document.createElement("input");
    inputTab.classList.add("todo-description");
    inputTab.type = "text";
    inputTab.value = todoItem.content;
    inputTab.setAttribute("readonly", "readonly");

    inputItem.appendChild(checkbox);
    inputItem.appendChild(inputTab);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttons");

    todoFirst.appendChild(buttonDiv);

    const editButton = document.createElement("input");
    editButton.classList.add("edit");
    editButton.value = "edit";
    editButton.type = "button";

    const deleteButton = document.createElement("input");
    deleteButton.classList.add("delete");
    deleteButton.value = "delete";
    deleteButton.type = "button";

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    item.appendChild(todoFirst);

    if (todoItem.done) {
      todoFirst.classList.add("done");
    }
    checkbox.addEventListener("change", (e) => {
      todoItem.done = e.target.checked;
      localStorage.setItem("todoList", JSON.stringify(todo));

      if (todoItem.done) {
        todoFirst.classList.add("done");
      } else {
        todoFirst.classList.remove("done");
      }
      DisplayTodos();
    });
    editButton.addEventListener("click", (e) => {
      const inputBar = document.querySelector(".todo-description");
      inputBar.removeAttribute("readonly");
      inputBar.focus();
      inputBar.addEventListener("blur", (e) => {
        inputBar.setAttribute("readonly", true);
        todoItem.content = e.target.value;
        localStorage.setItem("todoList", JSON.stringify(todo));
        DisplayTodos();
      });
    });
      
    deleteButton.addEventListener('click', () => {
        todo = todo.filter(t => t != todoItem);
        localStorage.setItem("todoList", JSON.stringify(todo));
        DisplayTodos();
    })  
    
  });
}
