<template>
    <div class="columns">
      <div class="column is-12-desktop">
        <div class="columns is-centered">
          <div class="column is-5-desktop">
             <b-field label="Email">
               <b-input @keyup.native.enter="login" v-model="email"></b-input>
              </b-field>

               <b-field label="Password">
               <b-input @keyup.native.enter="login" type="password" v-model="password"></b-input>
               
              </b-field>
              <a class="is-pulled-right" @click="resetPassword">Recuperar contraseña</a>
              
              <b-checkbox native-value="Remember me">Remember me</b-checkbox>
              
<br>
<br>


              <b-button @click="login" class="button  is-large is-success  is-fullwidth" outlined>Entrar</b-button>
          </div>
          
        </div>

        <div class="columns is-centered">
          <div class="column is-5">
              <b-button  class="button is-info  is-fullwidth" @click="$router.push('register')" outlined>Crear una cuenta</b-button>
          </div>
          
        </div>
      </div>

    </div>

    
</template>

<script>
import axios from "axios";
import utils from "../utils";

export default {

    data() {

        return {
            email: 'nouaryk@protonmail.ch',
            password: '',
            isLoading: false,
            users: null
        }
    },

    mounted() {
        this._checkLoginStatus('IS_USER_LOGGED');
       //utils.showNotification();
       console.log(utils.showNotification());
    },

    methods: {
    
        login() {
            parent = this;
            parent.isLoading = true;

            axios.post("http://127.0.0.1:3000/login",  {
            data: {
                email: this.email,
                password: this.password 
            }})
                .then((response) => {
                    parent.isLoading = false;
                    if (response.status == 200) {
                        console.log(response.data);
                        this._checkLoginStatus(response.data.status);
                    }
                }).catch((err) => {
                        parent.isLoading = false;
                        console.log('not responding bruh')
                        this._checkLoginStatus('NOT_RESPONDING');

                    return err;
                })
        },

        _checkLoginStatus(status) {

            switch(status) {
                case 'USER_LOGIN_SUCCESS':
                    this.$store.commit('LOGIN')
                    this.getMessage(`Has iniciado sesión.`, 'is-success');
                    this.$router.push('/account/dashboard');
                break;
                 case 'USER_LOGIN_FAILED': 
                    this.getMessage('Parece que el Email o la contraseña son incorrectos.', 'is-warning');

                break;

                case 'IS_USER_LOGGED': 

                break;

                case 'NOT_RESPONDING':
                    this.getMessage('El servidor no responde, vuelve a intentarlo dentro de unos minutos.', 'is-warning');
                break;


            }
        },

        getMessage(message, type, duration = 3000) {
            this.$buefy.toast.open({
                duration: duration,
                message: message,
                type: type,
                queue: false
            })
        },

        resetPassword() {
            this.$buefy.dialog.prompt({
                message: `Introduce tu correo electrónico`,
                inputAttrs: {
                    placeholder: 'admin@protonmail.com',
                    maxlength: 20,
                    type: 'email'
                },
                trapFocus: true,
                onConfirm: (value) => {
                    this.$buefy.toast.open(`En breve recibirás un email para recuperar tu contraseña.`)
                }
            })
        }
    }
}
</script>

<style>
.is-t-success {
  background-color: transparent;
  border-color: green;
  color: green;
}
a {
  color: #525252;
}
</style>

