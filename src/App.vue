<script setup>
import Header from './components/Header.vue';
import { useRouter } from 'vue-router';
</script>

<template>
    <v-app>
        <Header />
        <v-main>
        <v-container>
            <router-view></router-view>
        </v-container>
        </v-main>
    </v-app>
  
</template>

<style scoped>

</style>
