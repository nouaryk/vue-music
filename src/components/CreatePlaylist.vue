<template>
    <div class="has-text-centered" v-if="$store.state.showPlaylistCreator">
        <h2 class="titled">Crear una nueva playlist</h2>
        <b-field type="is-danger">
          <b-input id="playlist-name"  @keyup.native.enter="create" v-model="playlistName"></b-input>
        </b-field>
        {{ perPage }}
        <b-button @click="cancel">Cancelar</b-button>
        <b-button @click="create" class="is-success" outlined>Crear</b-button>
     </div>

</template>

<style>
   h2.titled {
       font-size: 3em;
       color: #fff;
   }

   .playlist-name {
       width: 100%;
        padding: 20px;
        border: none;
        background-color: transparent;
        border-bottom: 2px solid #fff;
   }
</style>
<script>
import axios from "axios";
    export default {
        name: 'create-playlist',
        props: ['modal', 'perPage'],
        data:  () => {
            return {
                playlistName: '',
                close_modal: this.modal
            }
        },

        mounted() {
            document.getElementById('playlist-name').focus();
        },
        methods: {
            create() {
               if(this.playlistName!='') {
                   
                    // Add new playlist
                    this.addPlaylist();

                    //this.$store.commit('ADD_PLAYLIST',this.playlistName)
                    // Empty playlist name
                   // this.playlistName = '';
                    
                    // Hide playlist creator component
                    this.$store.commit('CLOSE_PLAYLIST_CREATOR') 
                    this.$emit('close')// close modal
                    } else {
                         this.$buefy.toast.open({
                            duration: 3000,
                            message: `Introduce el título de la playlist`,
                            type: 'is-warning',
                            queue: false
                        })
                    }
              
                },

                cancel() {
                    this.$store.commit('CLOSE_PLAYLIST_CREATOR') 
                    this.$emit('close')
                },

                addPlaylist() {

                    const parent=this;
                    axios.post("http://127.0.0.1:3000/playlist/add",  {
                        data: {
                            title: this.playlistName,
                            description: this.playlistName 
                        }})
                    .then((response) => {
                        if (response.status == 200) {
                            parent.getMessage(`La playlist <strong class="has-text-white">${this.playlistName}</strong> se ha creado con éxito`, 'is-success');

                            const playlist_settings = {
                                limitFrom: this.$store.state.savedPagination.limitFrom,
                                perPage: this.$store.state.savedPagination.perPage,
                                NUMBER_OF_ITEMS: this.$store.state.savedPagination.NUMBER_OF_ITEMS,
                                PAGE_NUMBER: this.$store.state.savedPagination.PAGE_NUMBER,
                                REQUEST_TYPE_GET_ALL: false
                            }

                            
                            this.$store.commit('SET_PAGINATION', playlist_settings);
                            this.$store.commit('UPDATE_PLAYLISTS', playlist_settings);
                        }
                    }).catch((err) => {
                        console.log('ERROR: ', err)
                        parent.getMessage('El servidor no responde, vuelve a intentarlo dentro de unos minutos.', 'is-warning');
                    })
                },
                getMessage(message, type, duration = 3000) {
                this.$buefy.toast.open({
                    duration: duration,
                    message: message,
                    type: type,
                    queue: false
                })
        }  
        }
        
    }
</script>