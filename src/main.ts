import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import LoginPage from './pages/auth/LoginPage.vue'
import SignUpPage from './pages/auth/SignUpPage.vue'
import DashboardPage from './pages/private/DashboardPage.vue'

const routes = [
  { path: '/', name: 'dashboard', component: DashboardPage },
  { path: '/login', name: 'auth.login', component: LoginPage },
  { path: '/signup', name: 'auth.signup', component: SignUpPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access-token')

  if (to.name === 'auth.login' || to.name === 'auth.signup') {
    if (token) {
      next({
        name: 'dashboard'
      })
    } else {
      next()
    }
  } else if (to.name === 'dashboard') {
    if (!token) {
      next({ name: 'auth.login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

createApp(App).use(router).mount('#app')
