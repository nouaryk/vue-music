<template>
    <b-navbar>
        <template slot="brand">
            <!--<router-link to="/">
            <img src="~@/assets/images/logo.png">
            </router-link>-->
              <router-link to="/" class="navbar-item" >Inicio</router-link>
            
        </template>
        <template slot="start">
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
            <div v-if="!$store.getters.logged"  class="buttons">
            <router-link class="button is-light is-small" to="/login">Entrar</router-link>
            <router-link to="/register" class="button is-default ">Registrarse</router-link>
        </div>

        <div v-else class="buttons">

             <b-navbar-dropdown label="Mi perfil">
              <router-link to="/account/dashboard" class="navbar-item" >Mis subidas</router-link>
              <router-link to="/account/settings" class="navbar-item">Preferencias</router-link>
            </b-navbar-dropdown>

            <b-navbar-item  @click="logout">Cerrar sesión</b-navbar-item>
        </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>


<script>
export default { 
  name: 'app-header',

  mounted() {
    console.log('mounted', this.$store.getters.logged);
  },
  
  methods: {
    logout() {
      this.$buefy.dialog.confirm({
          title: 'Cerrar sesión',
          message: '¿Estás seguro de que quieres cerrar la sesión ?',
          confirmText: 'Cerrar sesión',
          onConfirm: () => {
            this.$store.commit('LOGOUT')
            this.$buefy.toast.open('Hasta luego Lucas')
            this.$router.push('/')
          }
      })
    }
  }
}
</script>

