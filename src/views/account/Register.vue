<template>

    <div class="column">
    <section class="hero is-fullheight-with-navbar has-text-white">
        <div class="hero-body">
            <div class="container">

        <div class="columns is-centered">
          <div class="column is-5-desktop">

      <h1>Crear cuenta</h1>
      <b-field label="">
          <input  class="login-input" placeholder="Dirección de correo electrónico..." v-model="email" autofocus id="Email" type="text"/>
      </b-field>

    <b-field label="">
        <b-tooltip type="is-light" style="width: 100%;" label="Contraseña" position="is-right" always>
        <input class="login-input is-fullwidth" placeholder="******"  id="Password" v-model="password" type="password"/>
    </b-tooltip>

      </b-field>

    <b-field label="">
        <b-tooltip type="is-light" style="width: 100%;" label="Confirma tu contraseña..." position="is-right" always>
            
        <input class="login-input is-fullwidth" placeholder="******"  id="Password" v-model="password_confirm" type="password"/>
    </b-tooltip>
    </b-field>

        <div class="field has-text-right">
          <b-button @click="register" :class="{ 'is-loading': isLoading }" class="button is-link is-fullwidth">Crear cuenta</b-button>

          <p>¿Ya tienes una cuenta? <a @click="$router.push('/')">Iniciar sesión</a></p>
        </div>

    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
    
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
        register() {
            parent = this;

            if(this.password!=this.password_confirm) {
                this._checkLoginStatus('USER_CREATED_SAME_PASSWORDS');
            } 

            else if(this.email!=''&& this.password !='' && this.password_confirm!='') {
            parent.isLoading = true;
              axios.post("http://127.0.0.1:3000/register",  {
              data: {
                email: this.email,
                password: this.password 
              }
            })
              .then((response) => {
                parent.isLoading = false;
                if (response.status == 200) {

                    if(response.data.status=='USER_CREATED_SUCCESS') {
                        if(this.$session.exists()) {
                            this.$session.destroy();
                        }
                        this.$session.start()
                        this.$session.set('auth_session.email', this.email);
                        this.$session.set('auth_session.password', this.password);
                        this.$session.set('auth_session.logged', true);
                        this.$session.set('auth_session.token', response.data.auth_token);
                        this.$store.commit('SET_USER_LOGGED', true);
                        
                        this.getMessage(`Bienvenido.`, 'is-success');
                        this.$router.push('/');
                    } else {
                        this._checkLoginStatus(response.data.status);
                    }
                }
              }).catch((err) => {
                  console.log(err)
                parent.isLoading = false;
                this._checkLoginStatus('NOT_RESPONDING');
              })          
            } else {
                parent.isLoading = false;
                this._checkLoginStatus('USER_CREATED_FAILED');
            }
        },
         beforeMount() {
            document.title = this.$router.history.current.meta.title;
            document.getElementById('Email').focus();
        },

        _checkLoginStatus(status) {

            switch(status) {

                case 'USER_CREATED_SAME_PASSWORDS':
                    this.getMessage('Las contraseñas debes coincidir.', 'is-warning is-top-right');
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

        setSessionToken(token) {
            
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