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