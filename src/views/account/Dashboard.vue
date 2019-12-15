<template>
<section>
  <div v-if="$store.state.user_playlist.length > 0" class="column has-text-white ">
        <h2 class="title">Mis playlists ({{ $store.state.user_playlist.length }}) 
          <b-button @click="showPlaylistCreatorHandler" outlined class="button is-warning "  to="/">Crear playlist</b-button>
          </h2>
        <li :key="playlist.id" v-for="playlist in $store.state.user_playlist">
          
          <a class="has-text-white songname" :class="{'is-hidden': editMode && editingPlaylist==playlist._id }" click="">{{ playlist.title }} <span>{{playlist.songs.length}} songs</span></a>
          
          <div class="column is-12 is-relative" v-if="editMode && editingPlaylist==playlist._id">
            <b-input @keyup.native.enter="savePlaylist" @keyup.native="(e) =>playlistTitle=e.target.value" v-model="playlist.title"></b-input>
            <b-button  :class="{'is-loading': isLoading}" :disabled="playlistTitle==''"  @click="savePlaylist" class="button is-success is-fullwidth">Save</b-button>
            <a class="cancel is-pulled-right" @click="() => editMode=false">
              <i class="fas fa-times"></i>
            </a>
          </div>

          <div v-else>
            <i @click="editPlaylist" :title="playlist.title" :id="playlist._id"  class="fas fa-edit"></i> <i @click="deletePlaylist" :title="playlist.title" :id="playlist._id"  class="fas fa-trash-alt"></i>
          </div>
        </li>
      </div>

      <div v-else class="column is-12 has-white-text">
        <p><i>No tienes ninguna playlist.</i> <b-button @click="showPlaylistCreatorHandler" outlined class="button is-danger is-small "  to="/">Crear playlist</b-button> </p>
      
      </div>
 
  <b-modal :component="CreatePlaylist" :active.sync="openModalPlaylistCreator"
      :can-cancel="true" :on-cancel="onCancelCreatePlaylist">
    </b-modal>
</section>
</template>

<style>
h1 {
  color: #fff;
}
li {
  list-style: none;
  font-size: 1.4em;
}

a.cancel {
  font-size: .8em;
  position: absolute;
  color: #ececec;
  right: 20px;
  top: 20px;
}
a.cancel:hover {
  color: #afafaf;
}
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

a.songname span {
  font-size: .6em;
  color: #ddd;
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
        CreatePlaylist,
        editMode: false,
        editingPlaylist: null,
        playlistTitle: '',
        isLoading: false,
    }
  },
  mounted() {
    this.playlists = this.$store.state.user_playlist;
    this.$store.commit('UPDATE_PLAYLISTS');
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

    editPlaylist(e) {
      const id = e.target.id;
      this.editMode=true; // sets edit mode on
      this.editingPlaylist = id; // sets current editing playlist id 
    },

    savePlaylist() {
      this.isLoading = true;
      if(this.playlistTitle !=='') {
        axios.post(`http://127.0.0.1:3000/playlist/edit/${this.editingPlaylist}`, {
          data: {
            title: this.playlistTitle
          }
      })
        .then((response) => {
            if (response.status == 200) {
              this.getMessage('Se ha actualizado el nombre de tu playlist.', 'is-success');
              this.editMode = false;
              this.isLoading = false;
            }
        }).catch((err) => {
            console.log('ERROR: ', err)
            this.getMessage('Ha ocurrido un error, no se ha podido actualizar la playlist...', 'is-warning');
            this.editMode = false;
            this.isLoading = false;
        })
      }
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