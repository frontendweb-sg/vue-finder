<template>
  <router-view></router-view>
</template>

<script lang="ts">
export default {}
</script>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
const router = useRouter()
const authStore = useAuthStore()
const route = useRoute()

// if (authStore.isAuth) {
//   router.replace({ name: 'home' })
// }

console.log(route)
</script>

<style>
</style>