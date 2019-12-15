<template>
            
    <section class="hero is-fullheight-with-navbar has-text-white">
        <div class="hero-body">
            <div class="container">
      <div class="column is-5-desktop">

      <h1 class="title">Crear cuenta</h1>
        <b-field label="Correo electrónico">
          <b-input v-model="email" autofocus id="Email" type="text"></b-input>
        </b-field>

        <b-field label="Contraseña">
          <b-input id="Password" v-model="password" type="password"></b-input>
        </b-field>
         <b-field label="Confirmar contraseña">
          <b-input id="Password" v-model="password_confirm" type="password"></b-input>
        </b-field>


        <div class="field has-text-right">
          <b-button @click="register" :class="{ 'is-loading': isLoading }" class="button is-link is-fullwidth">Crear cuenta</b-button>

          <p>¿Ya tienes una cuenta? <a @click="$router.push('/')">Iniciar sesión</a></p>
        </div>

    </div>
    </div>
    </div>
    </section>
    
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            email: '',
            password: '',
            password_confirm: '',
            isLoading: false,
            users: null
        }
    },

    methods: {
        async register() {
            await this.getUser(null);
        },

        getUser(user) {

            parent = this;
            parent.isLoading = true;
              axios.post("http://127.0.0.1:3000/register",  {
              data: {
                email: this.email,
                password: this.password 
              }})
              .then((response) => {
                parent.isLoading = false;
              if (response.status == 200) {
                this._checkLoginStatus(response.data.status);
                  
                  if(response.data.status === 'USER_LOGIN_SUCCESS') {
                    this.$session.start()
                    this.$session.set('auth_session', response.data.auth_token)
                    this.$store.commit('SET_USER_LOGGED', true);
                }
              }
              }).catch((err) => {
                parent.isLoading = false;
                this._checkLoginStatus('NOT_RESPONDING');
                console.log(err)
              })
        },

        _checkLoginStatus(status) {

            switch(status) {
                case 'USER_CREATED_SUCCESS':
                    this.getMessage(`Bienvenido.`, 'is-success');
                    this.$router.push('/account/dashboard');
                    this.$store.commit('LOGIN')
                break;
                case 'USER_CREATED_FAILED': 
                    this.getMessage('Por favor rellena todos los campos y vuelve a intentarlo.', 'is-warning is-top-right');
                break;

                case 'USER_CREATED_ALREADY_EXISTS': 
                    this.getMessage('Ya existe una cuenta con este email, si te has olvidado la contraseña puedes restablecerla.', 'is-warning is-top-right', 5000);
                break;

                case 'NOT_RESPONDING':
                    this.getMessage('El servidor no responde, vuelve a intentarlo dentro de unos minutos.', 'is-warning is-top-right');
                break;
            }
        },

        getMessage(message, type, duration = 3000) {
            this.$buefy.toast.open({
                duration: duration,
                message: message,
                type: type
            })
        }
    }
}
</script>