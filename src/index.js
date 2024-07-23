import './style.css'

const form = document.querySelector("form#task-input")
const new_task_name = document.querySelector("input#task-name")
const new_task_due_date = document.querySelector("input#task-due-date")
const content_area = document.getElementById("tasks")
let task_id = 1

//todo: modify to add task to the current list data structure
form.addEventListener("submit", event => {
    event.preventDefault()

    const new_task_card = document.createElement("div")
    new_task_card.classList.add("task")
    new_task_card.dataset.id = `${task_id}`

    const new_task_text = document.createElement("div")
    new_task_text.classList.add("text")

    const new_task_header = document.createElement("h4")
    new_task_header.textContent = new_task_name.value

    const new_task_p = document.createElement("p")
    new_task_p.textContent = new_task_due_date.value

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "task" + task_id;
    checkbox.name = "task" + task_id;
    checkbox.addEventListener("click", handleClick)

    new_task_text.appendChild(new_task_header)
    new_task_text.appendChild(new_task_p)
    new_task_card.appendChild(new_task_text)
    new_task_card.appendChild(checkbox)

    content_area.appendChild(new_task_card)
    task_id++
    form.reset()
})

function handleClick(event){
    const checkbox = event.currentTarget
    const id_of_card = checkbox.id.slice(4)
    const card_to_remove = document.querySelector(`div.task[data-id='${id_of_card}']`)
    content_area.removeChild(card_to_remove)
}
// todo: form element for creating new empty list

// todo: function to generate tasklist onto webpage
// remove all content from other list
// generate tasks for all tasks inside tasklist
// store tasks inside objects and those taskslists inside another object

// todo: function to remove list and delete its tasks
