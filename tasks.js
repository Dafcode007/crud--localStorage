
let inputForm = document.getElementById('inputForm');
let taskList = document.getElementById('taskList');
let tasks = [];


// funcion que recibe como argumento una tarea y lo que hace es crear un objeto de tipo tarea y la guarda
// En el array de tareas
let createTask = (name) => {

    let task = {
        name: name,
        state: false
    }

    tasks.push(task);

    return task;
}

// Funcion que permite guardar el registro en la capa de datos, en este caso en el localStorage
let createRegister = () => {
    
    // Hacemos uso del loscalStorage para darle persistencia  a los datos, con el metodo setItem le pasamos
    // como key task y como value arreglo en donde se alamcenan los datos en formato json 
    localStorage.setItem('task', JSON.stringify(tasks)) 

    // una vez creado un registro lo rendereizamos en pantalla
    showRegisters();
}

let showRegisters = () => {

    taskList.innerHTML = ''; // limpiamos el html
    // obtenemos del localstorage el array de tareas atravez de la key task y lo parseamos de json a object array
    tasks = JSON.parse(localStorage.getItem('task'));
    
    // Validamos si el array es null entonces decalramos el array vacio
    if (tasks === null) {
        tasks = [];
    }
    // en caso contrario, renderizamos los datos del localStorage, para ello
    // Recorremos con un forach el array de tasks y renderizamo para cada elemento
    // Del array su respectivo html
    else {
        tasks.forEach(element => {
            taskList.innerHTML += `<div class="form-check my-1"><input class="form-check-input" type="checkbox" value="" id="task"><label class="form-check-label" for="flexCheckIndeterminate">${element.name}</label><!-- icons--><span class="float-rigth"><i class="material-icons">update</i><i class="material-icons">delete_forever</i></span>`
        });
    }

}

// metodo que recorre recibe el nombre de la tarea a eliminar, la busca en el array
// devuelve la posocion de la tarea en el array y la elimina y actualiza el localStorage
let deleteRegister = (taskName) => {
    let iArray;
    
    tasks.forEach((element, index) => {
        
        if (element.name === taskName) {
            iArray = index;
        }
    });

    tasks.splice(iArray, 1);
    createRegister();
}


// Evento que se activa en el momento de accionar el boton de añadir tarea
inputForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // obtenemos el dato del input
    let inputTask = document.getElementById('inputTask').value;

    // Creamos una tarea a partir del dato que capturamos a travez del input
    createTask(inputTask);
    
    // hacemos un insert de la tarea en la database
    createRegister(); 

    inputForm.reset(); // limpiamos el campo del formulario
});

// Evento del dom para renderizar los registros
document.addEventListener('DOMContentLoaded', showRegisters);

// Evento para al hacer click sobre los iconos detectar la tarea

taskList.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.innerHTML === 'delete_forever' || e.target.innerHTML === 'update') {
        let name = e.path[2].childNodes[1].innerHTML;
        
        if (e.target.innerHTML === 'delete_forever') {
            deleteRegister(name);
        }
    }
    
});

