import './style.scss';

let userTaskInput = document.querySelector('.userTaskInput');
const addBtn = document.querySelector('.add-btn');
let taskList = document.querySelector('.task-list');


addBtn.addEventListener('click', createToDo);

function createToDo() {
  const value = userTaskInput.value.trim();
  if (value === "") return;

  const listItem = document.createElement('li');
  const textSpan = document.createElement('span');
  const delBtn = document.createElement('button');

  textSpan.textContent = value;
  delBtn.textContent = "X";

  delBtn.addEventListener('click', () => {
    listItem.remove();
  });
  
  listItem.appendChild(textSpan);
  listItem.appendChild(delBtn);
  taskList.appendChild(listItem);
  
  userTaskInput.value = "";
}