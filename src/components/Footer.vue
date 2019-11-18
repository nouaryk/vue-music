<template>
    <footer>
      <hr />
            <a @click="legalAdvice">Condiciones de uso</a> |
            <router-link to="/contact" >Contacto</router-link>
    </footer>
</template>

<script>
export default { 
  name: 'app-footer',
  methods: {
    legalAdvice() {
        this.$buefy.dialog.alert({
            title: 'Condiciones de uso',
            message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id ex sit amet urna facilisis volutpat. Morbi metus tortor, porttitor sit amet pulvinar in, rutrum vel leo. Praesent viverra mauris in nulla rhoncus dapibus at id neque. Sed ultricies venenatis erat, sed luctus odio fringilla mattis. Maecenas ornare ligula ut urna viverra bibendum. Vestibulum iaculis semper enim. Fusce mattis ipsum erat, at varius turpis ullamcorper sit amet. Sed sed fermentum velit, vel dignissim libero. Donec sit amet nunc ex. Duis pretium, justo vehicula auctor sagittis, lacus est accumsan tellus, id tempor lectus libero nec tellus.
            <br>
            Vivamus metus dui, dapibus a fermentum eu, eleifend et mi. Etiam lobortis mi ac orci finibus, at egestas ante placerat. Praesent vehicula feugiat ligula, quis tempus ipsum tincidunt a. Phasellus dictum, diam vel euismod finibus, tortor sem aliquam massa, vehicula fringilla turpis lacus fringilla nisi. Sed eget vulputate turpis. Aenean ex libero, dapibus nec odio at, egestas pellentesque nisl. Suspendisse sed justo at mauris pellentesque hendrerit. Curabitur vitae condimentum dolor, nec commodo eros. Suspendisse lacinia, arcu id ultrices viverra, felis justo tristique quam, quis venenatis leo lacus a nisi.
            <br>
            Pellentesque feugiat, eros quis malesuada condimentum, magna tortor dictum nunc, non aliquet augue sem aliquam ex. Integer pharetra nibh metus, pretium porttitor ipsum porttitor sed. Vestibulum luctus aliquet nisl ut pharetra. Proin convallis venenatis tempus. Nam nec ex id tellus tempus cursus at ac velit. Suspendisse sollicitudin fringilla molestie. Donec dignissim vel libero quis rhoncus. Duis elementum justo nec dignissim aliquet.
            <br>
            Fusce at hendrerit metus. Maecenas eu sem eu nunc lacinia facilisis. Ut dictum, ante vel aliquet euismod, felis lorem hendrerit lectus, sit amet mollis neque leo eu ligula. Phasellus tellus lectus, pulvinar vel mauris id, semper ultrices mauris. In sit amet auctor arcu, id eleifend ex. Quisque dignissim diam non facilisis faucibus. Nam ac pretium mi.
            <br>
            Suspendisse sodales neque imperdiet dui dictum, nec imperdiet neque fermentum. Sed commodo at dolor id bibendum. Pellentesque at eros risus. Morbi tempor dolor non neque aliquam rutrum. Mauris lacus eros, viverra sodales gravida eget, eleifend quis tellus. Mauris eu sapien quis sem facilisis euismod. Suspendisse maximus mauris ex, vel egestas nisl porttitor ut. Cras vestibulum mollis eros, efficitur pretium neque rhoncus aliquam. Ut efficitur mattis consectetur. Vestibulum a dapibus quam, vitae dictum dolor. Donec auctor blandit nulla, et ultrices nunc gravida eu. Nullam pulvinar nec felis at pharetra. Morbi accumsan risus in nunc sodales facilisis vitae id nunc. Nullam luctus, tellus non blandit dignissim, dui ex egestas neque, eu finibus elit leo et mi. Etiam placerat nec leo id semper.`,
            confirmText: 'Cerrar',
            type: 'is-info',
            size: 'is-small'
        })
    }
  }
}
</script>

