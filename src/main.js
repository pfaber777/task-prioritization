import './style.scss';

class Task {
  constructor(value) {
    this.value = value;
    this.listItem = document.createElement('li');
    this.textSpan = document.createElement('span');
    this.delBtn = document.createElement('button');
    this.editBtn = document.createElement('button');

    this.textSpan.textContent = this.value;
    this.editBtn.textContent = "Edit";
    this.delBtn.textContent = "X";

    this.listItem.append(this.textSpan, this.editBtn, this.delBtn);

    this.setupListeners();
  }

  setupListeners() {
    this.delBtn.addEventListener('click', () => {
      this.listItem.remove();
    });

    this.editBtn.addEventListener('click', () => {
      if (this.editBtn.textContent === 'Edit') {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = this.value;

        this.listItem.replaceChild(input, this.textSpan);
        this.editBtn.textContent = "Save";

        input.focus();

      } else {
          const input = this.listItem.querySelector('input');
          this.value = input.value.trim();
          this.textSpan.textContent = this.value;
          this.listItem.replaceChild(this.textSpan, input);
          this.editBtn.textContent = 'Edit';
        }
      });
  }
  render(container) {
    container.appendChild(this.listItem);
  }
}

const userTaskInput = document.querySelector('.userTaskInput');
const taskList = document.querySelector('.task-list');
const addBtn = document.querySelector('.add-btn');

function globalAddLogic() {
  const value = userTaskInput.value.trim();
  if (value === "") return;
  
  const task = new Task(value);
  task.render(taskList);
  
  userTaskInput.value = "";
}

addBtn.addEventListener('click', globalAddLogic);
userTaskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    globalAddLogic();
  }
});
 