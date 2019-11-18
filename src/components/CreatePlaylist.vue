<template>
    <div class="has-text-centered" v-if="$store.state.showPlaylistCreator">
        <h2 class="titled">Crear una nueva playlist</h2>
        <b-field type="is-danger">
          <b-input native.autofocus @keyup.native.enter="create" v-model="playlistName"></b-input>
        </b-field>

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
        props: ['modal'],
        data:  () => {
            return {
                playlistName: '',
                close_modal: this.modal
            }
        },
        methods: {
            create() {
               if(this.playlistName!='') {
                   this.$buefy.toast.open({
                        duration: 3000,
                        message: `La playlist ${this.playlistName} se ha creado con éxito`,
                        type: 'is-dark',
                        queue: false
                    })
                    // Add new playlist
                    this.addPlaylist(this.playlistName);

                    //this.$store.commit('ADD_PLAYLIST',this.playlistName)
                    // Empty playlist name
                    this.playlistName = '';
                    
                    // Hide playlist creator component
                    this.$store.commit('CLOSE_PLAYLIST_CREATOR') 
                    this.$emit('close')// close modal
                    }
              
                },

                cancel() {
                    this.$store.commit('CLOSE_PLAYLIST_CREATOR') 
                    this.$emit('close')
                    
                },

                addPlaylist(data) {
                    axios.post("http://127.0.0.1:3000/playlist/add", {
                        data: {
                            title: data
                        }
                    })
                    .then((response) => {
                        if (response.status == 200) {
                        console.log(response.data)
                        }
                    }).catch((err) => {
                        console.log('ERROR: ', err)
                    })
                },
        }
    }
</script>