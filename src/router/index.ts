import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import APP from '../App.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/pay',
  //   name: 'Pay',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../components/pay.vue'),
  // },
  {
    path: '/',
    name: 'Home',
    component: APP,
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
