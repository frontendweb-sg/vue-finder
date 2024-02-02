<template>
  <h1>Login</h1>
  <form @submit.prevent="onSubmit">
    <input type="email" v-model="auth.email" name="email" placeholder="Email" />
    <input type="password" v-model="auth.password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
export default {}
</script>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { reactive } from 'vue'

// import auth store
const authStore = useAuthStore()

// route
const router = useRouter()

// auth state
const auth = reactive({
  email: 'pradeep.kumar5@rsystems.com',
  password: 'Admin123'
})

const onSubmit = async () => {
  const data = await authStore.login(auth)
  if (data) {
    router.push('/users')
  }
}
</script>

<style scoped>
</style>