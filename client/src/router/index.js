import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Signup from "../views/Signup"
import Login from "../views/Login"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
