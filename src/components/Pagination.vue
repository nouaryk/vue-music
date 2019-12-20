<template>
<div>
<ul class="is-flex">
    <li :class="{'active': page==currentPage}" class="tag is-light" style="margin-left: 10px" v-for="page in $store.getters.amountPages" :key="page"
    @click="onPaginate(page)">{{page}}</li>
</ul> 
<!--
<div class="pagination">
    <p>
        <i class="fas fa-arrow-left paginate"></i>&nbsp; 1 de 7 
        <i class="fas fa-arrow-right paginate"></i> 
    </p>

</div>
-->
</div>
</template>

<script>
    export default {
        name: 'pagination',
        props: ['perPage', 'elements'],
        data() {
            return {
                currentPage: 1
            }
        },
        mounted() {
            
            //this.$store.commit('SET_AMOUNT_OF_PAGES', ({elements: this.elements, perPage:  this.perPage}));
        },
        methods: {
            onPaginate(page) {
                const elements = this.elements;

                if(this.currentPage!=page) {
                    const current = page;

                    if(this.currentPage!=page) {
                        this.currentPage = page;
                    }
                    
                    let perPage = 0, _from=0;
                    perPage = this.perPage;
                    
                    if(page!=1) {
                        _from = elements;
                    }

                    const playlist_settings = {
                        limitFrom: 5,
                        perPage,
                        NUMBER_OF_ITEMS: elements,
                        PAGE_NUMBER: current,
                        REQUEST_TYPE_GET_ALL: false
                    }

                    this.$store.commit('SET_PAGINATION', playlist_settings);
                    this.$store.commit('UPDATE_PLAYLISTS', playlist_settings);
                }
            }
        }
    }
</script>

<style> 
    .paginate {
        padding: 6px;
        border-radius: 50px;
        background-color: #4c425a;
        clear:both;
        margin-top: 15px;
    }
    .pagination {
        color: #fff;
    }
    .pagination strong {
        color: #fff;
    }
</style>