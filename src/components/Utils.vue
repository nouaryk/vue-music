<script>
export default { 
  name: 'app-footer',
  methods: {
    
  },
  showNotification(message='no message set', type='is-warning', duration=3000) {
       Vue.$buefy.toast.open({
                duration: duration,
                message: message,
                type: type
            })
    }
}
</script>

