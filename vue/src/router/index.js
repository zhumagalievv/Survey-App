import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Authentication from "../views/auth/Authentication.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Survey from "../views/survey/Survey.vue";
import {next} from "lodash/seq";
import store from "../store";

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'DefaultLayout',
    component: DefaultLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/survey',
        name: 'Survey',
        component: Survey
      },
    ]
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    name: 'Authentication',
    meta: {
      isGuest: true
    },
    component: Authentication,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Register
      },
    ]
  },
]

let router;

export default router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({
      name: 'login'
    })
  } else if (store.state.user.token && to.meta.isGuest) {
    next(
      {
        name: 'dashboard'
      }
    )
  } else {
    next()
  }
})
