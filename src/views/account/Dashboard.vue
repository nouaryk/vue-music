<template>
  <div>
      
    <div class="columns is-multiline">
      <div v-if="$store.state.user_playlist.length > 0" class="column is-12">
        <h1 class="title">Mis playlists ({{ $store.state.user_playlist.length }}) <b-button @click="showPlaylistCreatorHandler" outlined class="button is-danger is-small "  to="/">Crear playlist</b-button></h1>
        <li :key="playlist.id" v-for="playlist in $store.state.user_playlist">
          <a href="">{{ playlist.title }}</a> <i @click="deletePlaylist" :title="playlist.title" :id="playlist._id"  class="fas fa-trash-alt"></i>
        </li>
      </div>

      <div v-else class="column is-12">
        <p><i>No tienes ninguna playlist.</i> <b-button @click="showPlaylistCreatorHandler" outlined class="button is-danger is-small "  to="/">Crear playlist</b-button> </p>
      </div>

    </div>

    <b-modal custom-class="pepepepepe"  :component="CreatePlaylist" :active.sync="openModalPlaylistCreator"
      :can-cancel="true" :on-cancel="onCancelCreatePlaylist" >
    </b-modal>

  </div>
</template>

<style>
  .thumbnail {
    opacity: .5;
    cursor: pointer;
    transition-duration: .4s;
  }
  
  .selected {
    opacity: .9;
  }
  .preview {
    max-width: 800px;
  }
</style>

<script>
import CreatePlaylist from '@/components/CreatePlaylist'

import axios from "axios";
export default {
  components: { CreatePlaylist },
  data() {
    return {
        playlists: this.$store.state.user_playlist,
        openModalPlaylistCreator: false,
        CreatePlaylist
    }
  },

  
  mounted() {
    this.playlists = this.$store.state.user_playlist;
  },
  methods: {
    showPlaylistCreatorHandler() {
      this.$store.commit('OPEN_PLAYLIST_CREATOR');
      this.openModalPlaylistCreator=true
    },

    loadPlaylists() {
      const loadingComponent = this.$buefy.loading.open({})
    },

   

    onCancelCreatePlaylist() {
      this.$store.commit('CLOSE_PLAYLIST_CREATOR');
    },

    deletePlaylist(e) {

      const parent = this;
       this.$buefy.dialog.confirm({
          title: `Eliminar ${e.target.title} `,
          message: '¿Estás seguro de que quieres eliminar esta playlist ?',
          confirmText: 'Eliminar',
          onConfirm: () => {
             const id=e.target.id;
              axios.post(`http://127.0.0.1:3000/playlist/delete/${id}`, {
                data: {
                  id: id
              }})
            .then((response) => {
            if (response.status == 200) {
              this.$store.commit('UPDATE_PLAYLISTS'); // update playlists 
            }
            }).catch((err) => {
              parent.getMessage('El servidor no responde, vuelve a intentarlo dentro de unos minutos.', 'is-warning');
            });
          }
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