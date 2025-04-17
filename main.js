let all_tasks = [];
let current_filter = 'All';

const input_field = document.querySelector('.task-input')
const add_button = document.querySelector('.add-task-btn')
const list_container = document.querySelector('task-list')
const filter_buttons = document.querySelectorAll('.filter-btn')

if (add_button) {
    add_button.addEventListener('click', add_task)
}
if (filter_buttons.length > 0) {
    filter_buttons.forEach(function (button) {
        button.addEventListener('click', function (){
            current_filter = button.innerText;
            show_tasks()
        });
    });
}

function add_task() {
    let text = input_field.value.trim()

    if (text === '') {
        alert('Please enter a task.');
        return;
    }
    let task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    all_tasks.push(task);
    input_field.value = '';
    show_tasks();
}

function toggle_complete(task_id) {
    for (let i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].id === task_id) {
            all_tasks[i].completed = !all_tasks[i.completed];
            break;
        }
    }
    show_tasks();
}

function delete_task(task_id) {
    let updated_tasks = [];

    for (let i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].id !== task_id) {
            updated_tasks.push(all_tasks[i]);
        }
        
    }
    all_tasks = updated_tasks
    show_tasks();
}
// removing all existing tasks
function show_tasks() {
    while (list_container.firstChild) {
        list_container.removeChild(list_container.firstChild);
    }

// filtered tasks
    let filtered_tasks = [];

    if (current_filter === 'All') {
        filtered_tasks = all_tasks;
    } else if (current_filter === 'Completed') {
        for (let i = 0; i < all_tasks.length; i++) {
            if (all_tasks[i].completed === true) {
               filtered_tasks.push(all_tasks[i]); 
            }
            
        }
    } else if (current_filter === 'pending') {
        for (let i = 0; i < all_tasks.length; i++) {
            if (all_tasks[i].completed === false) {
                filtered_tasks.push(all_tasks[i]);
            }
            
        }
        
    }

// each task
    for (let i = 0; i < filtered_tasks.length; i++) {
        let task = filtered_tasks[i];

        const list_item = document.createElement('li');

        if (task.completed === true) {
            list_item.classList.add('completed');
        }

// text Element task
        const task_text = document.createElement('span');
        task_text.innerText = task.text
// container buttons
        const button_container = document.createElement('div');
        button_container.classList.add('task-buttons')
// button: done/undone
        const done_btn = document.createElement('button');
        done_btn.innerText = task.completed ? 'undo' : 'done';
        done_btn.addEventListener('click', function () {
            toggle_complete(task.id);
        });
// delete_btn
        const delete_btn = document.createElement('button');
        delete_btn.innerText = '🗑️';
        delete_btn.addEventListener('click', function () {
            delete_task(task.id);
        });

        button_container.appendChild(done_btn);
        button_container.appendChild(delete_btn);
        
        list_item.appendChild(task_text);
        list_item.appendChild(button_container);

        list_container.appendChild(list_item);
    }
}