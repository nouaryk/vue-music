<template>

  <div class="columns">
    <div class="column is-1">
      <sidebar-menu></sidebar-menu>

    </div>
    <div class="column">
    <div class="container" id="app">
      
      <router-view/>

      <app-footer></app-footer>

    </div>
    </div>
    
    

  

  
  </div>
</template>

<style>
  @import url('../src/assets/css/main.css');
  @import url('../src/assets/css/all.css');
</style>

<script>
  
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SideBarMenu from '@/components/SideBarMenu'
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'sidebar-menu': SideBarMenu
  }
}

</script>
