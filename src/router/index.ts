import { createRouter, createWebHistory } from 'vue-router'
import TermiBoxView from '@/views/TermiBoxView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'termi-box',
      component: TermiBoxView,
    },
  ],
})

export default router
