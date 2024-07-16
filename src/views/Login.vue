<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
    }
  },
  methods: {
    login() {
      if (this.username.trim()) {
        localStorage.setItem('username', this.username.trim());
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>
<template>
  <h1>Login</h1>
    <div class="w-50 ms-auto me-auto text-center" >
      <v-form @submit.prevent="login">
        <v-text-field 
          label="Nome Utente" 
          v-model="username" 
          required
        ></v-text-field>
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-form>
    </div>
</template>



<style scoped>
</style>
