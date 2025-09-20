import './style.scss';

class Task {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
    this.listItem = document.createElement('li');
    this.textSpan = document.createElement('span');
    this.delBtn = document.createElement('button');
    this.editBtn = document.createElement('button');

    this.textSpan.textContent = this.value;
    this.editBtn.textContent = "Edit";
    this.delBtn.textContent = "X";

    this.listItem.append(this.textSpan, this.editBtn, this.delBtn);

    // Internal refs used during editing
    this.input = null; // created only in edit mode
    this._prevValue = null; // for cancelling edit
    this._onInputKeydown = null; // so we can remove the listener

    this.setupListeners();
  }

  render() {
    const container = document.querySelector(`.task-list-${this.priority}`);
    if (!container) {
      console.error(`No container found for priority: ${this.priority}`);
      return;
    }
    this.listItem.classList.add(`priority-${this.priority}`);
    container.appendChild(this.listItem);
  }

  // Wire up listeners
  setupListeners() {
    this.delBtn.addEventListener('click', () => {
      this.listItem.remove();
    });

    this.editBtn.addEventListener('click', () => {
      if (this.isEditing()) {
        this.saveEdit();

      } else {
          this.enterEditMode();
        }
      });
    }


  // State helper
  isEditing() {
    return this.editBtn.textContent === 'Save';
  }

  //-- Edit flow --
  enterEditMode() {
    this._prevValue = this.value;

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.value = this.value;

    this.listItem.replaceChild(this.input, this.textSpan);
    this.editBtn.textContent = 'Save';
    this.input.focus();

    // Keyboard support
    this._onInputKeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.saveEdit();

      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.cancelEdit();
      }
    };
    this.input.addEventListener('keydown', this._onInputKeydown);
  }

  saveEdit() {
    if (!this.input) return; // guard clause

    const next = this.input.value.trim();
    this.value = next || this._prevValue;

    this.textSpan.textContent = this.value;
    this.listItem.replaceChild(this.textSpan, this.input);
    this.editBtn.textContent = 'Edit';

    // Clean up
    this.input.removeEventListener('keydown', this._onInputKeydown);
    this.input = null;
    this._onInputKeydown = null;
    this._prevValue = null;
  }
  cancelEdit() {
    if (!this.input) return; // guard clause

    this.listItem.replaceChild(this.textSpan, this.input);
    this.editBtn.textContent = 'Edit';

    // clean up
    this.input.removeEventListener('keydown', this._onInputKeydown);
    this.input = null;
    this._onInputKeydown = null;
    this.prevValue = null;
  }
}

const userTaskInput = document.querySelector('.userTaskInput');
// const taskList = document.querySelector('.task-list');
const addBtn = document.querySelector('.add-btn');
const prioritySelect = document.querySelector('.priority-select');

function globalAddLogic() {
  const value = userTaskInput.value.trim();
  const priority = prioritySelect.value;
  if (value === "") return;
  
  const task = new Task(value, priority);
  task.render();
  
  userTaskInput.value = "";
}

addBtn.addEventListener('click', globalAddLogic);

userTaskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    globalAddLogic();
  }
});
 