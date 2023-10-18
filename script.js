const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");
let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(taskText => {
        createTaskElement(taskText);
    });
}

function createTaskElement(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    taskItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        tasks = tasks.filter(task => task !== taskText);
        saveTasks();
    });

    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        saveTasks();
    });

    taskList.appendChild(taskItem);
}

function saveTasks() {
    const taskElements = document.querySelectorAll("#task-list li");
    const taskTexts = Array.from(taskElements).map(task => task.textContent);
    localStorage.setItem("tasks", JSON.stringify(taskTexts));
}

document.getElementById("add-task").addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText);
    tasks.push(taskText);
    saveTasks();

    taskInput.value = "";
});
