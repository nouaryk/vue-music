<template>
  <div id="form" class="columns is-centered animated">
    <div class="column is-4-desktop">

      <h1 class="title">Iniciar sesión</h1>
      <form>
        <b-field label="Correo electrónico">
          <b-input v-model="email" autofocus id="Email" type="text"></b-input>
        </b-field>

        <b-field label="Contraseña">
          <b-input id="Password" v-model="password" type="password"></b-input>
        </b-field>

        <div class="field has-text-right">
          <a class="is-pulled-left" @click="resetPassword">Recuperar contraseña</a>
          <b-button @click="login" :class="{ 'is-loading': isLoading }" class="button is-default">Iniciar sesión</b-button>
          
          <p><a @click="$router.push('/register')">Registrarse</a></p>
        </div>

      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
    data() {
        return {
            email: 'nouaryk@protonmail.ch',
            password: '123',
            isLoading: false,
            users: null
        }
    },

    mounted() {
        this._checkLoginStatus('IS_USER_LOGGED');
    },

    methods: {
        async login() {
            await this.getUser(null);
        },

        getUser(user) {
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
                        this._checkLoginStatus(response.data.status, 'USER_LOGIN_SUCCESS');
                        
                        

                        // Comprobar que la cuenta existe
                        /*response.data.forEach((data) => {
                            if (data.email == this.email && data.password == this.password) {
                                console.log('correcto');
                                this.getMessage(`Bienvenido ${data.name}, pasa al fondo.`, 'is-success');
                                this.$router.push('/');
                                this.$store.commit('LOGIN')
                                console.log(this.$store.logged);
                            } else {
                                this.getMessage('Vaya... Parece que el Email o la contraseña son incorrectos.', 'is-warning');
                                document.getElementById('form').classList.remove('shake');
                                setTimeout(() => {
                                    document.getElementById('form').classList.add('bounce');
                                }, 500)
                            }
                        });
                    */

                    }
                    //dispatch({ type: Actions.RECEIVE_DATA, payload: response.data }) //Change
                }).catch((err) => {
                    parent.isLoading = false;
                    return err;
                    //dispatch({type: Actions.FETCH_DATA_ERROR, payload: err})
                })
        },

        _checkLoginStatus(status) {

            switch(status) {
                case 'USER_LOGIN_SUCCESS':
                    this.getMessage(`Bienvenido.`, 'is-success');
                    this.$router.push('/');
                    this.$store.commit('LOGIN')
                break;

                case 'IS_USER_LOGGED':

                axios.post("http://127.0.0.1:3000/checkLogged")
                .then((response) => {
                    if (response.status == 200) {
                        console.log(response.data);
                    }
                }).catch((err) => {
                    console.log(err)
                })

                break;

                default:
                    this.getMessage('Parece que el Email o la contraseña son incorrectos.', 'is-warning');
                    document.getElementById('form').classList.remove('shake');
                    setTimeout(() => {
                        document.getElementById('form').classList.add('bounce');
                    }, 500)
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