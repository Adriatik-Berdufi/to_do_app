// src/store/index.js
import { reactive } from 'vue';

export const store = reactive({
  tasks: [],
  archivedTasks: [],
  editingTaskIndex: -1,
  username :[],
  addTask(task) {
    this.tasks.push(task);
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
  },
  archiveTask(index) {
    if (index >= 0 && index < this.tasks.length && this.tasks[index].completed) {
      const archivedTask = this.tasks.splice(index, 1)[0];
      this.archivedTasks.push(archivedTask);
    }
  }
  
});
