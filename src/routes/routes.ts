import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const canAccess = () => {
  const authStore = useAuthStore()
  if (authStore.isAuth) {
    return true
  }
  return false
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/about.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    alias: ['/login'],
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/auth/auth.vue'),
    children: [
      {
        path: '',

        name: 'Login',
        component: () => import('../views/auth/login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/auth/register.vue')
      }
    ]
  },
  {
    path: '/users',
    alias: ['/users/dashboard'],
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/users/index.vue')
  },
  {
    path: '/:notFound(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]
export const appRoutes = createRouter({
  routes,
  history: createWebHistory(),
  strict: true
})

// appRoutes.beforeEach(async (to, from, next) => {
//   const access = canAccess()
//   console.log(access, to)
//   //   if (to.name !== 'Auth' && !access) next('/auth')
//   //   else next()

//   if (access && (to.path !== '/auth' || to.path !== '/login' || to.path !== '/auth/register')) {
//     console.log('hi')
//     next('/users')
//   } else next()
// })

appRoutes.beforeEach(async (to, from, next) => {
  const access = canAccess()
  console.log(!access && to.meta.requiresAuth, to)
  console.log(to.redirectFrom.fullPath)
  if (!access && to.meta.requiresAuth) {
    next('/auth?')
  } else {
    next()
  }
})
