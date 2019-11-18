export const utils = {
    name: 'utils',
    getMessage(message, type, duration=3000) {
       this.$buefy.toast.open({
        duration: duration,
        message: message,
        type: type, 
        queue: false
      })
    }
}