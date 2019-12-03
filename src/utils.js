import Vue from 'vue'

import Buefy from 'buefy'
console.log('ok')
const utils = {
    showNotification($event, message, type, duration = 3000) {
        Vue.$buefy.toast.open({
            duration: duration,
            message: message,
            type: type,
            queue: false
        })
    }
}

export default utils;