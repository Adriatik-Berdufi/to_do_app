<script>
import { store } from '../store/index.js';

export default {
  name: 'Home',
  data() {
    return {
      newTask: '',
      dialog: false, // Stato della modale
      username: '',
      tasks: []
    };
  },
  computed: {
    store() {
      return store;
    },
    editingTaskIndex() {
      return store.editingTaskIndex;
    }
  },
  methods: {
    addOrEditTask() {
      if (this.editingTaskIndex === -1) {
        this.addTask();
      } else {
        this.editTask();
      }
      this.dialog = false; // Chiudi la modale dopo l'aggiunta o la modifica del task
    },

    addTask() {
      if (this.newTask.trim()) {
        const task = {
          name: this.newTask.trim(),
          completed: false,
          username: this.username
        };
        console.log('Task to add:', task);
        store.addTask(task);
        this.newTask = '';
      }
    },  

    editTask() {
      if (this.editingTaskIndex >= 0 && this.editingTaskIndex < store.tasks.length) {
        store.editTask(this.editingTaskIndex, this.newTask.trim());
        this.newTask = '';
        store.stopEdit(); // Completa la modifica e reimposta lo stato di editing
      }
    },

    deleteTask(index) {
      store.deleteTask(index); // Elimina il task selezionato
    },

    completeTask(index) {
      store.completeTask(index); // Conferma che il task è stato completato
    },

    undoCompleteTask(index) {
      store.undoCompleteTask(index); // Annulla la conferma del task completato
    },

    startEditing(index) {
      store.startEdit(index); // Avvia la modalità di modifica per il task selezionato
      this.newTask = store.tasks[index].name; // Inizializza il campo di input con il nome del task
      this.dialog = true; // Apri la modale
    },
    // Manda il task nel archivio 
    archiveTask(index) { 
      if (index >= 0 && index < store.tasks.length && store.tasks[index].completed) {
        const archivedTask = store.tasks.splice(index, 1)[0];
        store.archivedTasks.push(archivedTask);

        // Naviga verso complited se voglio che mi porti diretamente a quella route
        //this.$router.push({ name: 'Completed' });
      }
    },
    logout() {
      localStorage.removeItem('username');
      this.$router.push({ name: 'Login' });
    },
  },
  created(){
    this.username = localStorage.getItem('username') || '';
  }
};
</script>
<template>
  <div>
    <v-container>
      <h1>To Do List</h1>
      <!-- Pulsante per aprire la modale -->
      <v-btn class="mb-3 me-3" @click="dialog = !dialog" color="primary">Aggiungi Task</v-btn>
      <!-- Pulsante per logout -->
      <v-btn class="mb-3 ms-3" @click="logout" color="primary">Logout</v-btn>

      <!-- Modale per l'inserimento del task -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title v-if="editingTaskIndex === -1">Inserisci un nuovo task</v-card-title>
          <v-card-title v-else>Modifica task</v-card-title>
          <v-card-text>
            <v-text-field v-model="newTask" label="Task" outlined></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addOrEditTask">{{ editingTaskIndex === -1 ? 'Aggiungi' : 'Salva' }}</v-btn>
            <v-btn color="blue" @click="dialog = false">Annulla</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Elenco dei task -->
      <v-card v-if="store.tasks.length > 0">
        <v-list>
          <v-list-item v-for="(task, index) in store.tasks" :key="index">
            <v-list-item-content class="d-flex justify-space-between">
              <v-text v-if="!task.completed">{{ task.name}}<small class="mx-5 text-blue">{{ task.username }}</small></v-text>
              <v-text v-else><s>{{ task.name }}<small class="mx-5 text-blue">{{ task.username }}</small></s></v-text>
              <div>
                <v-icon class="mx-2" @click="startEditing(index)">mdi-pencil</v-icon>
                <v-icon class="mx-2" @click="completeTask(index)" v-if="!task.completed">mdi-check-circle</v-icon>
                <v-icon class="mx-2" @click="undoCompleteTask(index)" v-if="task.completed">mdi-check-circle-outline</v-icon>
                <v-icon class="mx-2" @click="archiveTask(index)" v-if="task.completed">mdi-archive</v-icon>
                <v-icon class="mx-2" @click="deleteTask(index)">mdi-delete</v-icon>
              </div>
            </v-list-item-content>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>



<style scoped>
</style>
