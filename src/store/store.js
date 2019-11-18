import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      logged: false,
      uploaded_files: [],
      isAdmin: true,
      playlists: [],
      showPlaylistCreator: false,
      user_playlist: [],
  },
   mutations: {
    LOGIN: (state) => {
      console.log('LOGGED IN')
      state.logged = true;
    },
     LOGOUT: (state) => {
      console.log('LOGGED OUT')
      state.logged = false;
    },

    ADD_PLAYLIST(state, playlist) {
      console.log('Playlist creada')
      state.playlists.push(playlist);
      //state.showPlaylistCreator = false;
      console.log(this.playlists)
    },

    SET_USER_PLAYLIST(state, playlist) {
      axios.get("http://127.0.0.1:3000/getPlaylists")
                .then((response) => {
                    if (response.status == 200) {
                      state.user_playlist.push(response.data)
                    }
                }).catch((err) => {
                    console.log('ERROR: ', err)
                })

    },

    OPEN_PLAYLIST_CREATOR(state) {
      state.showPlaylistCreator = true;
    },
    CLOSE_PLAYLIST_CREATOR(state) {
      state.showPlaylistCreator = false;
    }
  },
  getters: {
    logged: state => state.logged
   /* getShowPlaylistCreator: (state) => {
      return state.showPlaylistCreator
    }*/

  }
})