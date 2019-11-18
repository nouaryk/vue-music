<template>
    <div class="columns">
      <div class="column is-12-desktop">
        <div class="columns is-centered">
          <div class="column is-5-desktop">
             <b-field label="Email">
               <b-input></b-input>
              </b-field>

               <b-field label="Password">
               <b-input></b-input>
              </b-field>
              <b-checkbox native-value="Remember me">Remember me</b-checkbox>
<br>
<br>


              <b-button @click="login" class="button  is-large is-success  is-fullwidth" outlined>Entrar</b-button>
          </div>
          
        </div>

        <div class="columns is-centered">
          <div class="column is-5">
              <b-button  class="button is-info  is-fullwidth" outlined>Crear una cuenta</b-button>
          </div>
          
        </div>
      </div>

    </div>

    
</template>

<script>

export default {

  methods: {

    login() {
      console.log('ok')
      this.$store.commit('LOGIN')
      this.$router.push('/account/dashboard')
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

