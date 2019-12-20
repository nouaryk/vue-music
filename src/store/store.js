import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        logged: false,
        isAdmin: true,
        playlists: [],
        showPlaylistCreator: false,
        user_playlist: [],
        user_playlist_total: 0,
        isLoading: false,
        savedPagination: {
            from: 0,
            perPage: 1, 
            elements: 0,
            PAGE_NUMBER: 0
        },
        amountPages:  0
    },
    mutations: {
        LOGIN: (state) => {
            state.logged = true;
        },
        ADD_PLAYLIST(state, playlist) {
            console.log('Playlist creada')
            state.playlists.push(playlist);
        },

        SET_USER_LOGGED(state, session_status) {
            state.logged = session_status;
        },

        /**
         * Retrieves through a rest api call the playlist from database 
         */
        UPDATE_PLAYLISTS(state,pagination) {
            state.isLoading = true;
            
            axios.post("http://127.0.0.1:3000/getPlaylists", {
                pagination
            })
                .then((response) => {
                    if (response.status == 200) {
                        if(!pagination.REQUEST_TYPE_GET_ALL) {
                            state.user_playlist = response.data.playlists;
                            state.user_playlist_total = response.data.total;
                            console.warn(Math.ceil(response.data.total/ state.savedPagination.perPage))
                            state.amountPages = Math.ceil(response.data.total/ pagination.perPage)
                        } else {
                            state.playlists = response.data.playlists;
                        }

                        console.log('amountPages', state.amountPages)
                        state.isLoading = false;
                        console.log('checking', state.savedPagination.PAGE_NUMBER, '-----', state.amountPages)

                         let currentPage = state.savedPagination.PAGE_NUMBER;
                        if(state.savedPagination.PAGE_NUMBER > state.amountPages) {
                            console.log('smth is not right bro..')
                            state.savedPagination.PAGE_NUMBER--;
                        //state.savedPagination.PAGE_NUMBER = 1;
                        }
              
                    }
                }).catch((err) => {
                    state.isLoading = false;
                    console.log(error)
                })

        },
        /**
         * We save pagination settings
         */
        SET_PAGINATION(state, pagination) {
            state.savedPagination = pagination;
        },
        SET_AMOUNT_OF_PAGES(state, payload) {
            console.log('SET_AMOUNT_OF_PAGES!!')
            state.amountPages = Math.ceil(payload.elements/payload.perPage)
            console.log('--', payload);
        },
        CHECK_IS_LAST_PAGE_DELETED(state) {
            console.log('checking', state.savedPagination.PAGE_NUMBER, '-----', state.amountPages)
            if(state.savedPagination.PAGE_NUMBER > state.amountPages) {
                console.log('smth is not right bro..')
            }
        },

        /**
         * Makes a call to the rest api and checks for auth credentials
         */
        CHECK_USER_AUTH(state, auth) {
            axios.post("http://127.0.0.1:3000/check_auth", {
                data: {
                    email: auth.email,
                    password: auth.password
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        if(response.data.status == 'USER_AUTH_SUCCESS' && response.data.user_auth_token==auth.token) {
                            state.logged = true;
                        } else {
                            state.logged = false;
                        }
                    }
                }).catch((err) => {
                    console.log('ERROR: ', err)
                })
        },
        // Playlist Modal 
        OPEN_PLAYLIST_CREATOR(state) {
            state.showPlaylistCreator = true;
        },
        CLOSE_PLAYLIST_CREATOR(state) {
            state.showPlaylistCreator = false;
        }
    },

    actions: {
         
    },
    getters: {
        logged: state => state.logged,
        amountPages(state) {
            return state.amountPages;
        }
    }
})
