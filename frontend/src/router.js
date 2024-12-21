import { createMemoryHistory, createRouter } from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import Products from './components/Products.vue'
import Analytics from './components/Analytics.vue'

const routes = [
    { path: '/', component: Dashboard },
    { path: '/products', component: Products },
    {path: '/analytics', component: Analytics }
  ]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })