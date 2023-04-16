import {createRouter, createWebHistory} from 'vue-router'

import Admin from "@/components/Admin.vue";

import Main from "@/components/Main.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Main
    },
    {
        path: '/admin',
        name: 'admin',
        component:Admin
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router
