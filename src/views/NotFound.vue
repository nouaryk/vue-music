<template>
    <div>
        <div class="columns has-text-centered">
            <div class="column is-12">
                <h4 class="title">Error 404</h4>
                <img id="not-found"  src="~@/assets/images/404-cartman.gif" alt="">
            </div>
           
        </div>
        
    </div>
</template>


<script>
export default {
  data() {
    return {
        notFoundImage: '',
    }
  },

  mounted() {
      let random_image = document.getElementById('not-found');
  },

  methods: {

  }
}
</script>