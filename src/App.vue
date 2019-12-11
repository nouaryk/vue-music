<template>

  <div class="columns">
      <sidebar-menu></sidebar-menu>
      <router-view/>

      <app-footer></app-footer>

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
