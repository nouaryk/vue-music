<template>
    <div class="columns has-text-white">
      <div class="column is-12-desktop">
        <div class="columns is-centered">
          <div class="column is-5-desktop">
              <h1>Iniciar sesión</h1>
             <b-field label="">
               <input class="login-input" placeholder="Introduce tu dirección email..." spellcheck="false" autofocus @keyup.enter="login" v-model="email"/>
              </b-field>

               <b-field label="">
               <input class="login-input" placeholder="**********"  @keyup.enter="login" type="password" v-model="password"/>
               
              </b-field>
              <a class="is-pulled-right has-text-white" @click="resetPassword">Recuperar contraseña</a>
              
              <b-checkbox native-value="Remember me">Mantener sesión</b-checkbox>
            <br>
            <br>
              <b-button :class="{'is-loading': isLoading}" @click="login" class="button  is-large is-info  is-fullwidth">Entrar</b-button>
          </div>
          
        </div>

        <div class="columns is-centered">
          <div class="column is-5">
              <b-button  class="button is-warning is-fullwidth" @click="$router.push('register')">Crear una cuenta</b-button>
          </div>
          
        </div>
      </div>

    </div>

    
</template>

<script>
import axios from "axios";

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
        console.log(this.$session.getAll())
        console.log(this.$session.exists())
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
                        this._checkLoginStatus(response.data.status);
                        if(response.data.status === 'USER_LOGIN_SUCCESS') {
                            console.log(response.data)
                            this.$session.start()
                            this.$session.set('auth_session.email', this.email);
                            this.$session.set('auth_session.password', this.password);
                            this.$session.set('auth_session.logged', true);
                            this.$session.set('auth_session.token', response.data.auth_token);
                          
                            this.$store.commit('SET_USER_LOGGED', true);
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                    parent.isLoading = false;
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
                    this.getMessage('Parece que el Email o la contraseña son incorrectos.', 'is-warning is-top-right');

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
  color: #fecd51;
}
</style>

