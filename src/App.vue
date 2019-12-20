<template>

  <div class="columns is-multiline">
      <sidebar-menu></sidebar-menu>

      <b-loading :is-full-page="isFullPage" :active.sync="$store.state.isLoading" :can-cancel="true"></b-loading>

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
  },

  data() {
    return {
      isFullPage: true
    }
  },

   watch: {
        $route(to, from) {
            document.title = to.meta.title || 'Piedrify | Inicio';
        },
    }
    
}

</script>
