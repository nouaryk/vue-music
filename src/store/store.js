import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

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
        ADD_PLAYLIST(state, playlist) {
            console.log('Playlist creada')
            state.playlists.push(playlist);
        },

        SET_USER_LOGGED(state, session_status) {
            state.logged = session_status;
        },

        UPDATE_PLAYLISTS(state, user_id = null) {
            axios.get("http://127.0.0.1:3000/getPlaylists")
                .then((response) => {
                    if (response.status == 200) {
                        state.user_playlist = response.data;
                    }
                }).catch((err) => {
                    console.log('ERROR: ', err)
                })
        },
        CHECK_USER_AUTH(state, auth) {
            axios.post("http://127.0.0.1:3000/check_auth", {
                data: {
                    email: auth.email,
                    password: auth.password
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        console.log('auth', auth)
                        
                        if(response.data.status == 'USER_AUTH_SUCCESS' && response.data.user_auth_token==auth.token) {
                            state.logged = true;
                            console.log('dentro')
                            console.log('session_token', auth.token, 'session_api', response.data.token)
                        } else {
                            console.log('fuera')
                            state.logged = false;
                        }
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
    }
})
