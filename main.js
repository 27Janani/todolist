document.addEventListener+++++'DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('single-task');
    var taskName = taskInput.value;

    if (taskName.trim() === '') {
        alert("Please enter a task.");
        return;
    }

    var newElement = createTaskElement(taskName);
    document.querySelector('.listofelements').appendChild(newElement);
    saveTasksToLocalStorage();

    taskInput.value = '';
}

function createTaskElement(taskName) {
    var newElement = document.createElement('div');
    newElement.className = 'elements';
    var mainContent = document.createElement('div');
    mainContent.className = 'maincontent';
    var taskTitle = document.createElement('h1');
    taskTitle.textContent = taskName;
    var deleteButton = document.createElement('button');
    deleteButton.className = 'deletebutton';
    deleteButton.innerHTML = '&times;';

    deleteButton.addEventListener('click', function() {
        newElement.remove();
        saveTasksToLocalStorage();
    });

    mainContent.appendChild(taskTitle);
    mainContent.appendChild(deleteButton);
    newElement.appendChild(mainContent);

    return newElement;
}

function saveTasksToLocalStorage() {
    var tasks = document.querySelectorAll('.elements');
    var tasksArray = [];

    tasks.forEach(function(task) {
        tasksArray.push(task.querySelector('h1').textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function loadTasks() {
    var tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach(function(task) {
            var newElement = createTaskElement(task);
            document.querySelector('.listofelements').appendChild(newElement);
        });
    }
}

document.getElementById('task-area').addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});
