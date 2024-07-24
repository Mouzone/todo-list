import './style.css'

const task_form = document.querySelector("form#task-input")
const new_task_name = document.querySelector("input#task-name")
const new_task_due_date = document.querySelector("input#task-due-date")
const content_area = document.getElementById("tasks")
let task_id = 1

// todo: make text go ... if task is too long
//todo: modify to add task to the current list data structure
task_form.addEventListener("submit", event => {
    event.preventDefault()

    createTaskElement(task_id, new_task_name.value, new_task_due_date.value)

    lists[list_select.value][task_id] = {}
    lists[list_select.value][task_id].task_name = new_task_name.value
    lists[list_select.value][task_id].due_date = new_task_due_date.value
    localStorage.setItem("lists", JSON.stringify(lists));

    task_id++
    task_form.reset()
})

const list_form = document.querySelector("form#list-input")
const list_select = document.querySelector("select")
const list_name = document.getElementById("list-name")
list_form.addEventListener("submit", event => {
    event.preventDefault()

    lists[`${list_name.value}`] = {}
    localStorage.setItem("lists", JSON.stringify(lists));

    const list_option = document.createElement("option")
    list_option.value = list_name.value
    list_option.textContent = list_name.value
    list_select.appendChild(list_option)

    list_form.reset()
})

function createTaskElement(task_id, new_task_name, new_task_due_date) {
    const new_task_card = document.createElement("div")
    new_task_card.classList.add("task")
    new_task_card.dataset.id = `${task_id}`

    const new_task_text = document.createElement("div")
    new_task_text.classList.add("text")

    const new_task_header = document.createElement("h4")
    new_task_header.textContent = new_task_name

    const new_task_p = document.createElement("p")
    new_task_p.textContent = `Due: ${new_task_due_date}`

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
}

function handleClick(event) {
    const checkbox = event.currentTarget
    const id_of_card = checkbox.id.slice(4)
    const card_to_remove = document.querySelector(`div.task[data-id='${id_of_card}']`)
    content_area.removeChild(card_to_remove)
}

list_select.addEventListener("change", handleListSwitch)

function handleListSwitch() {
    content_area.innerHTML = ""
    Object.entries(lists[list_select.value]).forEach(([task_id, values]) => {
        createTaskElement(task_id, values.task_name, values.due_date)
    })
}

// todo: add a popup once it clicks to confirm list deletion
// todo: make Due: Today and Due: This Week not addable and not removeable
const remove_button = document.querySelector("button#remove-list")
remove_button.addEventListener("click", event => {
    delete lists[list_select.value]
    localStorage.setItem("lists", JSON.stringify(lists));

    const option = document.querySelector(`option[value='${list_select.value}']`)
    list_select.removeChild(option)

    handleListSwitch()
})

function initializePage() {
    Object.keys(lists).forEach(list_to_generate => {
        const option = document.createElement("option")
        option.value = list_to_generate
        option.textContent = list_to_generate
        list_select.appendChild(option)
    })

    handleListSwitch()
}

let lists = {
    "List": {},
    "Due: Today": {},
    "Due: This Week": {}
}

if (localStorage.getItem("lists")) {
    lists = JSON.parse(localStorage.getItem("lists"))
} else {
    localStorage.setItem("lists", JSON.stringify(lists));
}

initializePage()