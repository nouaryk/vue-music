import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/account/Login'
import Register from '@/views/account/Register'
import { store } from '@/store/store'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: Home, name: 'Home' },
        { path: '/login', component:() => import('@/views/account/Login') },
        { path: '/register', component:() => import('@/views/account/Register') },
        { path: '/account/settings', component:() => import('@/views/account/Settings'),
    beforeEnter: (to, from, next) => {
                store.state.logged ? next() : next({ name: 'Home' }) 
            } },
        { path: '/account/dashboard', component:() => import('@/views/account/Dashboard'),
            beforeEnter: (to, from, next) => {
                store.state.logged ? next() : next({ name: 'Home' }) 
            },
        },
        { path: '*', component:() => import('@/views/NotFound') },
        
    ]
})