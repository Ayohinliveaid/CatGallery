import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import Introduction from '../src/views/Introduction.vue';

const routes = [
    {
        path: '/',
        name: 'introduction',
        component: Introduction

    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;