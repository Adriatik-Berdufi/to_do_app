import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Completed from '../views/Completed.vue';
import Login from '../views/Login.vue';
import Albo from '../views/Albo.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/home', name: 'Home', component: Home },
  { path: '/completed', name: 'Completed', component: Completed },
  { path: '/albo', name: 'Albo', component: Albo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
