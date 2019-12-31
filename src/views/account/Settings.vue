<template>
      <div class="column is-5-desktop">
        <h1 class="title">Preferencias</h1>

        <b-field  label="Correo electrónico">
              <b-input @keyup.native="checkForm" id="email" disabled v-model="email" type="email"></b-input>
         </b-field>
          <b-field label="Contraseña">
              <b-input @keyup.native="checkForm" v-model="password" type="password"></b-input>
          </b-field>
          <b-field label="Nueva contraseña">
              <b-input @keyup.native="checkForm" type="password" v-model="new_password"></b-input>
          </b-field>

          <b-button @click="save" :class="{'is-loading': isLoading}" :disabled="isDisabled" class="button is-success is-fullwidth">Guardar</b-button>
        </div>
</template>

<style>

</style>

<script>
import axios from "axios";

export default {
    data() {
        return {
            isLoading: false,
            isDisabled: true,
            email: '',
            password: '',
            new_password: ''
        }
    },
    mounted() {
        this.email = this.$session.get('auth_session.email');
    },
    methods: {

        // On typing handler
        checkForm() {
            console.log('ok')
            if (this.email != '' && this.password != '' && this.new_password != '') {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
            }
        },

        save() {
            if (this.password != this.new_password) {
                this.isLoading = true;
                axios.post("http://127.0.0.1:3000/user/update-settings",  {
                data: {
                    email: this.email,
                    password: this.password,
                    new_password: this.new_password
                }})
                .then((response) => {
                    if (response.status == 200) {
                        this.isLoading = false;
                            console.log(response.data)
                        if(response.data.status === 'UPDATE_SETTINGS_SUCCESS') {
                            this.getMessage('Tu contraseña se ha cambiado con éxito.', 'is-success')
                        } else {
                            this.getMessage('Contraseña incorrecta.', 'is-warning')
                        }
                    }
                }).catch((err) => {
                    this.isLoading = false;
                    console.log(err)
                })


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

<style >
.label {
  color: #fff;
}
</style>