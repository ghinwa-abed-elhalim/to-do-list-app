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