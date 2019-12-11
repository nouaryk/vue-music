// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store/store'
import { playlist } from './store/playlist'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'animate.css/animate.min.css'


import VueSession from 'vue-session'
var options = {
    persist: true
}

Vue.use(VueSession, options)
Vue.use(Buefy)

Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
    router,
    store,
    playlist,
    render: h => h(App),
}).$mount('#app')