import './style.css'

const button = document.querySelector("button")
const form = document.querySelector("form")
const new_task_name = document.querySelector("input#task-name")
const new_task_due_date = document.querySelector("input#task-due-date")
const content_area = document.getElementById("tasks")
let task_id = 0

form.addEventListener("submit", event => {
    // todo: figure out preventDefault
    // todo: figure out how to reset form
    event.currentTarget.preventDefault()

    const new_task_card = document.createElement("div")
    new_task_card.classList.add("task")

    const new_task_text = document.createElement("div")
    new_task_text.classList.add("text")

    const new_task_header = document.createElement("h4")
    new_task_header.textContent = new_task_name.value

    const new_task_p = document.createElement("p")
    new_task_p.textContent = new_task_due_date.value

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "task" + task_id;
    checkbox.name = name;

    const label = document.createElement('label');
    checkbox.id = "task" + task_id;

    new_task_text.appendChild(new_task_header)
    new_task_text.appendChild(new_task_p)
    new_task_card.appendChild(new_task_text)
    content_area.appendChild(new_task_card)
    new_task_card.appendChild(label);
    new_task_card.appendChild(checkbox)
    task_id++
    form.reset()
})
