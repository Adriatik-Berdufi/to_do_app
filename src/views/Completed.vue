<script>
import { store } from '../store/index.js';

export default {
  name: 'Completed',
  computed: {
    store() {
        return store;
    },
    usernames() {
      // elenco dei username
      const users = store.archivedTasks.map(task => task.username);
      return [...new Set(users)];
    }, filteredTasks() {
      // Filtro per urename
      return store.archivedTasks.filter(task => {
        return (this.selectedUser ? task.username === this.selectedUser : true) &&
               (task.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                task.username.toLowerCase().includes(this.searchText.toLowerCase()));
      });
    },

  },
  data() {
    return {
      selectedUser: '',
      searchText: '',
    };
  },
  methods: {
     // porta il task di nuovo nella to do list
    removeFromArchive(index) {
        if (index >= 0 && index < store.archivedTasks.length) {
            const removedTask = store.archivedTasks.splice(index, 1)[0];
            store.tasks.push(removedTask);
        }
    },
    // elimina il task 
    deleteArchivedTask(index) {
        if (index >= 0 && index < store.archivedTasks.length) {
            store.archivedTasks.splice(index, 1); 
        }
    },
    // Svuota l'archivio 
    clearArchive() {
        store.archivedTasks = []; 
    }

  },
  
};
</script>


<template>
    <v-container>
      <h1>Task Completati</h1>
      
      <div class="d-flex">
        <!-- Select per username -->
        <v-select
        v-model="selectedUser"
        :items="usernames"
        label="Filtra per utente"
        ></v-select>
      
      <!-- filtro per username o nome del task -->
      <v-text-field
        v-model="searchText"
        label="Filtra per testo"
        outlined
        class="ms-5"
      ></v-text-field>
      </div>
      <v-card>
        <v-list>
          <v-list-item v-for="(task, index) in filteredTasks" :key="index">
            <v-list-item-content class="d-flex justify-space-between">
                <v-text>{{ task.name }} <small class="mx-5 text-blue">{{ task.username }}</small></v-text>
                
                <div>
                    <!-- Pulsante per portare il task di nuovo nella to do list -->
                    <v-icon class="mx-2" @click="removeFromArchive(index)">mdi-arrow-left-bold-circle</v-icon>
                    <!-- Pulsante per eliminare il task -->
                    <v-icon class="mx-2" @click="deleteArchivedTask(index)">mdi-delete</v-icon>
                </div>
            </v-list-item-content>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
        <!-- Per svutare tutto l'archivio  -->
        <v-card-actions class="d-flex justify-end">
            <v-btn color="red" @click="clearArchive">
                <v-icon left>mdi-delete-sweep</v-icon>
                Svuota Archivio
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
</template>

   
<style scoped>
</style>
  