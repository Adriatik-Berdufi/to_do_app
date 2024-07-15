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
      if (this.username) {
        localStorage.setItem('username', this.username)
        this.$router.push('/')
      }
    },
  },
}
</script>

<template>
    <div>
      <h1>Login</h1>
      <v-form @submit.prevent="login">
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-btn type="submit">Login</v-btn>
      </v-form>
    </div>
  </template>
  
  <style scoped>
  </style>
  