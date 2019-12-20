<template>
<section>
  <div v-if="$store.state.user_playlist_total > 0" class="column is-12 main-content has-text-white ">
        <div class="is-pulled-right">
          <i class="fas fa-user-alt"></i> TheRox
        </div>
        <h2 class="title">Mis playlists ({{ $store.state.user_playlist_total }}) 
          <b-button @click="showPlaylistCreatorHandler" outlined class="button is-warning "  to="/">Crear playlist</b-button>
          </h2>

        
        <li :key="playlist.id" v-for="playlist in $store.state.user_playlist">
          
          <a class="has-text-white songname" @click="$router.push('/playlist/'+playlist._id+'')" :class="{'is-hidden': editMode && editingPlaylist==playlist._id }" click="">{{ playlist.title }} <span>{{playlist.songs.length}} songs</span></a>
          
          <div class="is-relative" v-if="editMode && editingPlaylist==playlist._id">
            <input spellcheck="false" :id="'playlist-'+playlist._id" class="edit-playlist" @keyup.enter="savePlaylist" @keyup="(e) =>playlistTitle=e.target.value" v-model="playlist.title"/>
            <b-button  :class="{'is-loading': isLoading}" :disabled="playlistTitle==''" @click="savePlaylist" class="button is-success is-fullwidth">Save</b-button>
            <a class="cancel is-pulled-right" @click="() => editMode=false">
              <i class="fas fa-times"></i>
            </a>
          </div>

          <div v-else>
            <i @click="editPlaylist" :title="playlist.title" :id="playlist._id"  class="fas fa-edit"></i> <i @click="deletePlaylist" :title="playlist.title" :id="playlist._id"  class="fas fa-trash-alt"></i>
          </div>
        </li>

        <pagination :elements="$store.state.user_playlist_total"  :perPage="perPage"></pagination>
        


      </div>

      <div v-else class="column is-12 has-white-text">
        <p><i>No tienes ninguna playlist.</i> <b-button @click="showPlaylistCreatorHandler" outlined class="button is-danger is-small "  to="/">Crear playlist</b-button> </p>
      
      </div>
  </div>

 
  <b-modal :component="CreatePlaylist" :perPage="2" :active.sync="openModalPlaylistCreator"
      :can-cancel="true" :on-cancel="onCancelCreatePlaylist">
  </b-modal>
</section>
</template>


<script>
import CreatePlaylist from '@/components/CreatePlaylist'
import Pagination from '@/components/Pagination'

import axios from "axios";
export default {
    components: {
      'create-playlist' : CreatePlaylist,
      'pagination' : Pagination
    },
  data() {
    return {
        playlists: [],
        openModalPlaylistCreator: false,
        CreatePlaylist,
        editMode: false,
        editingPlaylist: null,
        playlistTitle: '',
        isLoading: false,
        currentPage: 1,
        _from: 0,
        perPage: 3
    }
  },
  mounted() {
    if(this.perPage < 0) this.perPage = 1; 
    this.getPlaylists();
    this.playlists = this.$store.state.user_playlist;

    //this.$store.commit('SET_AMOUNT_OF_PAGES', ({elements: 10, perPage:  5}));

    console.log('totall', this.$store.state.user_playlist_total)
  },
  
  methods: {

    showPlaylistCreatorHandler() {
      this.$store.commit('OPEN_PLAYLIST_CREATOR');
      this.openModalPlaylistCreator=true
    },
    onCancelCreatePlaylist() {
      this.$store.commit('CLOSE_PLAYLIST_CREATOR');
    },
    getPlaylists() {
       const playlist_settings = {
        limitFrom: 0,
        perPage: this.perPage,
        NUMBER_OF_ITEMS: 1,
        PAGE_NUMBER: 1,
        REQUEST_TYPE_GET_ALL: false
      }
      this.$store.commit('UPDATE_PLAYLISTS',  playlist_settings);
      
    },

    deletePlaylist(e) {

      console.log(this.playlists.length)
      
      
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

             /* let currentPage = this.$store.state.savedPagination.PAGE_NUMBER;
              if(this.$store.state.savedPagination.PAGE_NUMBER > this.$store.state.amountPages) {
                console.log('smth is not right bro..')
                currentPage--;
              //state.savedPagination.PAGE_NUMBER = 1;
              }
              */

              let currentPage;
              if(this.playlists.length==1) {
                currentPage=this.$store.state.savedPagination.PAGE_NUMBER-1;
              } else {
                  currentPage= this.$store.state.savedPagination.PAGE_NUMBER
              }

              const playlist_settings = {
                  limitFrom: this.$store.state.savedPagination.limitFrom,
                  perPage: this.$store.state.savedPagination.perPage,
                  NUMBER_OF_ITEMS: this.$store.state.savedPagination.NUMBER_OF_ITEMS,
                  PAGE_NUMBER: currentPage,
                  REQUEST_TYPE_GET_ALL: false
                }
                this.$store.commit('SET_PAGINATION', playlist_settings);
                this.$store.commit('UPDATE_PLAYLISTS', playlist_settings);
                
              }
            }).catch((err) => {
              parent.getMessage('El servidor no responde, vuelve a intentarlo dentro de unos minutos.', 'is-warning');
            });
          }
      })

      console.log(this.$store.getters.amountPages)
      

    },

    editPlaylist(e) {
      const id = e.target.id;
      this.editMode=true; // sets edit mode on
      this.editingPlaylist = id; // sets current editing playlist id 
      setTimeout(() => {
        console.log(document.getElementById(`playlist-${id}`))
        document.getElementById(`playlist-${id}`).focus();
        document.getElementById(`playlist-${id}`).click();
      }, 200)
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
      } else {
        this.isLoading = false;
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

<style>
li {
  list-style: none;
  font-size: 1.4em;
}
.edit-playlist {
  background-color: transparent;
  border: none;
  box-shadow: none;
  color: #fff;
  font-size: 1.4em;
}
.edit-playlist:focus {
  outline: none;
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