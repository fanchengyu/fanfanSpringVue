import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../../src/views/login')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../../src/views/login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
