<script setup>
</script>
<template>
 
    <v-app-bar app>
        <v-toolbar-title>To-Do App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text :to="{ name: 'Home' }">Home</v-btn>
        <v-btn text :to="{ name: 'Completed' }">Completed</v-btn>
        <v-btn text :to="{ name: 'Albo' }">Albo</v-btn>
        <v-btn text :to="{ name: 'Login' }">Login</v-btn>
    </v-app-bar>

</template>