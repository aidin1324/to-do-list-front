document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.querySelector('.task-list');
    const clearBtn = document.querySelector('.clear-btn');

    let tasks = [];

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        renderTasks();
    }

    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = {
                text: taskText,
                completed: false,
            };
            tasks.push(task);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        } else {
            alert('Нельзя пустую строку добавлять как task!');
        }
    });

    clearBtn.addEventListener('click', () => {
        if (confirm('Ты уверен,что хочешь очистить весь to-do-list?')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            const span = document.createElement('span');
            span.className = 'task-text';
            if (task.completed) {
                span.classList.add('completed');
            }
            span.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'x';

            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});