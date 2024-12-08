const task = {
    name: "",
    completed: false,
};

const listOfTasks = [];

const btn = document.querySelector("#clkTask");
const btnAll = document.querySelector("#all");
const btnTrue = document.querySelector("#allTrue");
const btnFalse = document.querySelector("#allFalse");
const btnClose = document.querySelector("#closeTask");
const btnDelete = document.querySelector("#delTask");
const input = document.querySelector("#returnTask");

btn.addEventListener("click", () => {
    const taskName = input.value.trim();            // удаляем лишние пробелы, чтобы получить корректное имя задачи
    if (taskName === "") {                          // отсекаем пустой ввод
        alert("Вы не ввели название задачи");
        return;
    }

    const existingTask = listOfTasks.find(task => task.name === taskName);    // проверка на уже существующую задачу с таким же названием
    if (existingTask) {
        alert("Задача с таким именем уже есть в списке.");
        input.value = "";
        return;
    }

    const newTask = { ...task, name: taskName };                        // добавляем прошедший проверку элемент в массив с задачами
    listOfTasks.push(newTask);
    input.value = "";
    renderTasks();
});

btnAll.addEventListener("click", () => { 
    if (listOfTasks.length != 0) {renderTasks()                    // запуск кнопки "Показать все задачи"
        const start = document.querySelector(".headList");               //Находим заголовок списка задач
        start.textContent = "Список всех Ваших задач";                  //Меняем заголовок 
        start.id = "allTask";                                            //Создаем класс для определения списка на экране
        start.parentNode.insertBefore(newList, start.nextSibling); } 
        else {
            alert("У вас нет задач.")
        }    
});             
btnTrue.addEventListener("click", () => { if (listOfTasks.length != 0) {renderTasks(true)                    // запуск кнопки "Показать все задачи"
    const start = document.querySelector(".headList");               //Находим заголовок списка задач
    start.textContent = "Список выполненных задач";                  //Меняем заголовок 
    start.id = "trueTask";                                            //Создаем класс для определения списка на экране
    start.parentNode.insertBefore(newList, start.nextSibling); } 
    else {
        alert("У вас нет задач.")
    }    
});
btnFalse.addEventListener("click", () => { if (listOfTasks.length != 0) {renderTasks(false)                    // запуск кнопки "Показать все задачи"
    const start = document.querySelector(".headList");               //Находим заголовок списка задач
    start.textContent = "Список не выполненных задач";                  //Меняем заголовок 
    start.id = "falseTask";                                            //Создаем класс для определения списка на экране
    start.parentNode.insertBefore(newList, start.nextSibling); } 
    else {
        alert("У вас нет задач.")
    }    
});

btnClose.addEventListener("click", () => {
    if (listOfTasks.length != 0) {
        if (document.querySelector(".headList").id != "allTask") {
            alert("Закрывать задачи можно только из списка всех задач.")
        } else {
    const taskIndex = prompt("Введите номер выполненной задачи") - 1;
    if (taskIndex >= 0 && taskIndex < listOfTasks.length) {
        listOfTasks[taskIndex].completed = true;
        renderTasks();
    } else {
        alert("Некорректный номер задачи");
    }}} else {
        alert("У вас нет задач")
    }
});

btnDelete.addEventListener("click", () => {
    if (document.querySelector(".headList").id != "allTask") {
        alert("Удалять задачи можно только из списка всех задач.")
    } else {
    if (listOfTasks.length != 0) {
    const taskIndex = prompt("Введите номер удаляемой задачи") - 1;
    if (taskIndex >= 0 && taskIndex < listOfTasks.length) {
        listOfTasks.splice(taskIndex, 1);
        renderTasks();
    } else {
        alert("Некорректный номер задачи");
    }} else {
        alert("У вас нет задач")
    }}
});

function renderTasks(completed = null) {
    const taskList = document.querySelector("#taskList");
    if (taskList) taskList.remove();

    const newList = document.createElement('ol');
    newList.id = "taskList";
    document.querySelector(".headList").parentNode.insertBefore(newList, document.querySelector(".headList").nextSibling);

    const filteredTasks = completed === null ? listOfTasks : listOfTasks.filter(task => task.completed === completed);

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {  
        newList.appendChild(li);
        //li.classList.add(red);
        li.innerHTML = `<s>  ${task.name}  </s>`
    } else {li.textContent = task.name;
        newList.appendChild(li);
    }
    li.dataset.index = index;
console.log(index)});

    document.querySelector("#taskList").addEventListener("dblclick", (event) => {
        if (document.querySelector(".headList").id != "allTask") {
            alert("Редактировать задачи можно только из списка всех задач.")
        } else {        
        if (event.target.tagName === "LI") {
            const index = event.target.dataset.index;
            const task = listOfTasks[index];
            if (task.completed) {
                alert("Закрытую задачу нельзя редактировать");
                return;
            }

            const newName = prompt("Введите новое название задачи", task.name);
            if (newName && newName.trim() !== "") {
                const existingTask = listOfTasks.find(t => t.name === newName);
                if (existingTask) {
                    alert("Задача с таким именем уже есть в списке.");
                } else {
                    task.name = newName;
                    renderTasks();
                }
            }
        }}
    });
}
