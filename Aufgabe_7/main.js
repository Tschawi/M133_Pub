import { ToDo } from './todo.js';

let todos = [
  new ToDo('Zugticket kaufen', false),
  new ToDo('Wäsche waschen', true),
  new ToDo('Hausaufgaben machen', true),
];

function updateToDoListOnScreen() {
  const todoListElement = document.getElementById('todolist');

  // Liste leeren
  deleteToDoList();

  // ToDo's einfügen
  for (const todo of todos) {
    const toDoListEntry = todo.element();
    todoListElement.appendChild(toDoListEntry);
  }

  // offene ToDo's
  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  const elementAnzahl = document.getElementById('anzahl');
  elementAnzahl.textContent = `${offeneToDos.length} ToDo's offen`;
}

function deleteToDoList() {
  const todoListElement = document.getElementById('todolist');

  todoListElement.innerHTML = '';
}

//Lösche erledigt Button
function deleteToDoListElement() {
  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  
  todos = offeneToDos;
  updateToDoListOnScreen();
}


document.addEventListener('DOMContentLoaded', (event) => {
  updateToDoListOnScreen();

  const neuesToDoElement = document.getElementById('neuesToDo');
  const loeschenButton = document.getElementById('aufraeumen');

  neuesToDoElement.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        if (neuesToDoElement.value == '') {
          alert("Gib etwas in das Eingabe-Feld ein!");
        }
        else {
          const todo = new ToDo(neuesToDoElement.value, false);
          todos.push(todo);
  
          neuesToDoElement.value = '';
  
          todo.addEventListener('loeschen', (e) => {
            const index = todos.indexOf(e.target);
            todos.splice(index, 1);
            updateToDoListOnScreen();
          });
  
          updateToDoListOnScreen();
        }
      }
  });

  loeschenButton.addEventListener('click', deleteToDoListElement);

});