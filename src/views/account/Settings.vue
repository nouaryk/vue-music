<template>
      <div class="column is-5-desktop">
        <h1 class="title">Preferencias</h1>

        <b-field label="Correo electrónico">
              <b-input @keyup.native="checkForm" id="email" v-model="email" type="email"></b-input>
         </b-field>
          <b-field label="Contraseña">
              <b-input @keyup.native="checkForm" v-model="password" type="password"></b-input>
          </b-field>
          <b-field label="Nueva contraseña">
              <b-input @keyup.native="checkForm" type="password" v-model="confirm_password"></b-input>
          </b-field>

          <b-button @click="save" :disabled="isDisabled" class="button is-default is-fullwidth">Guardar</b-button>
        </div>
</template>

<style>

</style>

<script>
import axios from "axios";

export default {
    data() {
        return {
            isDisabled: true,
            email: '',
            password: '',
            confirm_password: ''
        }
    },

    methods: {
        // On typing handler
        checkForm() {
            console.log('ok')
            if (this.email != '' && this.password != '' && this.confirm_password != '' && !document.getElementById('email').classList.contains('is-danger')) {
                this.isDisabled = false;
            }
        },

        save() {
            if (this.password != this.confirm_password) {
                this.getMessage('Tu contraseña se ha cambiado con éxito.', 'is-success')
            } else {
                this.getMessage('La nueva contraseña tiene que ser diferente a la antigua.', 'is-warning')
            }
        },

        getMessage(message, type, duration = 3000) {
            this.$buefy.toast.open({
                duration: duration,
                message: message,
                type: type,
                queue: false
            })
        }
    }
}
</script>