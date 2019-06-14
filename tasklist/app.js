//Define UI vard
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all evenet listeners
function loadEventListeners(){
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks
    filter.addEventListener('keyup',filterTasks);

}

function addTask(e){
    if(taskInput.value === ''){
        alert('Cant add nothing');
        return;
    }

    //Craete Li Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to the li   
    li.appendChild(document.createTextNode(taskInput.value));
    //create a new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon Html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //Append the Li to the ul
    taskList.appendChild(li);
    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

//Clear Tasks
function clearTasks(){
    if(!taskList.firstChild){
        alert("nothing to clear");
        return;
    }
    if(confirm('Are you sure?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }

    }
}

//Filter Tasks
function filterTasks(e){
    const text =  e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        }
    );
}