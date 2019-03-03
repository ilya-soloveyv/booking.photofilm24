import Vue from 'vue'
import App from './App.vue'

import Welcome from './components/Welcome.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Welcome
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')