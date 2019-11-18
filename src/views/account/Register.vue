<template>
  <div class="columns is-centered">
    <div class="column is-4-desktop ">

      <h1 class="title">Crear cuenta</h1>
      <form>
        <b-field label="Correo electrónico">
          <b-input v-model="email" autofocus id="Email" type="text"></b-input>
        </b-field>

        <b-field label="Contraseña">
          <b-input id="Password" v-model="password" type="password"></b-input>
        </b-field>
         <b-field label="Confirmar contraseña">
          <b-input id="Password" v-model="password" type="password"></b-input>
        </b-field>



        <div class="field has-text-right">
          <b-button @click="register" :class="{ 'is-loading': isLoading }" class="button is-link is-fullwidth">Crear cuenta</b-button>

          <p>¿Ya tienes una cuenta? <a @click="$router.push('/login')">Iniciar sesión</a></p>
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
            email: 'beckerobrien@anivet.com',
            password: 'admin1234',
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

            axios.get("http://www.json-generator.com/api/json/get/ceeWBBalxK?indent=4")
                .then((response) => {
                    parent.isLoading = false;
                    if (response.status == 200) {
                        this.users = response.data;

                        // Comprobar que la cuenta existe
                        response.data.forEach((data) => {
                            if (data.email == this.email && data.password == this.password) {
                                console.log('correcto');
                                this.getMessage(`Bienvenido ${data.name}, te has registrado con éxito.`, 'is-success');
                                this.$router.push('/');
                                this.$store.commit('LOGIN')
                                console.log(this.$store.logged);
                            } else {
                                this.getMessage('Email o contraseña incorrectos', 'is-warning');
                            }
                        });


                    }

                    //dispatch({ type: Actions.RECEIVE_DATA, payload: response.data }) //Change
                }).catch((err) => {
                    parent.isLoading = false;
                    return err;
                    //dispatch({type: Actions.FETCH_DATA_ERROR, payload: err})
                })
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