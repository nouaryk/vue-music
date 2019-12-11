import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/account/Register'
import Dashboard from '@/views/account/Dashboard'
import Settings from '@/views/account/Settings'
import NotFound from '@/views/NotFound'
import { store } from '@/store/store'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Home,
            name: 'Home',
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/account/settings',
            component: Settings,
            beforeEnter: (to, from, next) => {
                store.state.logged ? next() : next({ name: 'Home' })
            }
        },
        {
            meta: {
                title: 'PEPEPEPEPEPEPE',
            },
            path: '/account/dashboard',
            component: Dashboard,
            beforeEnter: (to, from, next) => {
                store.state.logged ? next() : next({ name: 'Home' })
            },

        },
        {
            path: '*',
            component: NotFound
        },

    ],
    mode: 'history'
})