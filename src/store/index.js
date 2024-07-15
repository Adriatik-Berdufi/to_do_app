// src/store/index.js
import { reactive } from 'vue';

export const store = reactive({
  tasks: [],
  editingTaskIndex: -1,

  addTask(task) {
    this.tasks.push({ name: task, completed: false });
  },

  editTask(index, newName) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].name = newName;
    }
  },

  deleteTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
    }
  },

  completeTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = true;
    }
  },

  undoCompleteTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = false;
    }
  },

  startEdit(index) {
    this.editingTaskIndex = index;
  },

  stopEdit() {
    this.editingTaskIndex = -1;
  }
});
