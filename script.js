const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");
let tasks = [];

// Load tasks from localStorage
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(taskData => {
        createTaskElement(taskData.task, taskData.completed);
    });
}

function createTaskElement(taskText, completed = false) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    if (completed) {
        taskItem.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.className = "delete-button";

    taskItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        tasks = tasks.filter(taskData => taskData.task !== taskText);
        saveTasks();
    });

    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        toggleTaskCompletion(taskText, taskItem.classList.contains("completed"));
    });

    taskList.appendChild(taskItem);
}

function toggleTaskCompletion(taskText, completed) {
    tasks = tasks.map(taskData => {
        if (taskData.task === taskText) {
            return { task: taskText, completed };
        }
        return taskData;
    });
    saveTasks();
}

function saveTasks() {
    const taskTexts = tasks.map(taskData => taskData.task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("add-task").addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText);
    tasks.push({ task: taskText, completed: false });
    saveTasks();

    taskInput.value = "";
});

