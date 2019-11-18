import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const playlist = new Vuex.Store({
    state: {
      playlists: [],
  },
   mutations: {
    ADD_PLAYLIST(state, playlist) {
      state.playlists.push(playlist);
      console.log(this.playlists)
    }
  },
  getters: {
    playlist: state => state.playlists
  }
})