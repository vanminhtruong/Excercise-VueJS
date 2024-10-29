import { createRouter, createWebHistory } from 'vue-router'
import Excercise1 from '@/components/Excercise-1.vue'
import Excercise2 from '@/components/Excercise-2.vue'
import Excercise3 from '@/components/Excercise-3.vue'
import Excercise4 from '@/components/Excercise-4.vue'
import Excercise5 from '@/components/Excercise-5.vue'
import Excercise6 from '@/components/Excercise-6.vue'
import Excercise7 from '@/components/Excercise-7.vue'
import TodoList from '@/components/TodoList.vue'
import PS5 from '@/components/PS5.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/excercise-1',
      name: 'excercise1',
      component: Excercise1,
    },
    {
      path: '/excercise-2',
      name: 'excercise2',
      component: Excercise2,
    },
    {
      path: '/excercise-3',
      name: 'excercise3',
      component: Excercise3,
    },
    {
      path: '/excercise-4',
      name: 'excercise4',
      component: Excercise4,
    },
    {
      path: '/excercise-5',
      name: 'excercise5',
      component: Excercise5,
    },
    {
      path: '/excercise-6',
      name: 'excercise6',
      component: Excercise6,
    },
    {
      path: '/excercise-7',
      name: 'excercise7',
      component: Excercise7,
    },
    {
      path: '/todo-list',
      name: 'todoList',
      component: TodoList,
    },
    {
      path: '/ps5',
      name: 'ps5',
      component: PS5,
    },
  ]
})

export default router
