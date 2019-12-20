import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/account/Register'
import UserPlaylists from '@/views/account/UserPlaylists'
import Playlist from '@/views/Playlist'
import Settings from '@/views/account/Settings'
import NotFound from '@/views/NotFound'
import { store } from '@/store/store'

Vue.use(Router)
const SNAME = 'Piedrify';

export default new Router({
    routes: [{
        meta: {
            title: 'Welcome to Piedrify',
        },
            path: '/',
            component: Home,
            name: 'Home',
        },
        {
            meta: {
            title: `${SNAME} | Crear una cuenta`,
        },
            path: '/register',
            component: Register
        },
        {
            meta: {
            title: `${SNAME} | Ajustes`,
        },
            path: '/account/settings',
            component: Settings,
            beforeEnter: (to, from, next) => {
                store.state.logged ? next() : next({ name: 'Home' })
            }
        },
        {
            meta: {
            title: `${SNAME} | Mis playlists`,
        },
            path: '/account/playlists',
            component: UserPlaylists,
            beforeEnter: (to, from, next) => {
                store.state.logged ? next() : next({ name: 'Home' })
            },
        },
        {
            meta: {
            title: `${SNAME} | Playlist`,
        },
            path: '/playlist/:id',
            component: Playlist,
        },
        {
            meta: {
            title: `${SNAME} | Echenique`,
        },
            path: '*',
            component: NotFound
        },

    ],
    mode: 'history'
})
