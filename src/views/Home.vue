<template>
<div class="column">
    <section class="hero is-fullheight-with-navbar has-text-white">
        <div class="hero-body">
            <div class="container">
                <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true">
                    <b-icon
                        pack="fas"
                        icon="sync-alt"
                        size="is-large"
                        custom-class="fa-spin">
                    </b-icon>
                </b-loading>

            <!-- LOGIN COMPONENT -->
                <app-login  v-if="!$store.state.logged"></app-login>
            <!-- END LOGIN COMPONENT -->
        
            <!-- SEARCH BOX -->
            <div v-else class="columns is-centered is-multiline">
                <div class="column is-12">
                    <h1>Buscar</h1>
                    <input :class="{'error': error}" id="search" spellcheck="false" v-model="songName" @keyup="error=false" @keyup.enter="searchSong" placeholder="Nombre de la canción o album..." class="search-song" />
                    <div>
                        <span class="is-pulled-right search-info-text">Puedes buscar por el nombre del artista, título o nombre del album.</span>
                    </div>
                </div>

                <div  class="column is-1 song-cover" :key="song.id" v-for="song in songsList" 
                :style="{ 'background-image': 'url(' + song.album.cover_medium + ')' }">
                    <div class="overlay-song-info">
                        <div @click="openAddTrackToPlaylistModal(song.id, song.title)" class="song-info" :id="song.id">
                            <i class="fas fa-plus-square"></i><br/>
                            <!--<p>{{song.title}}</p>
                            <span>{{song.artist.name}}</span>-->
                        </div>
                    </div>
                </div>
            </div>
            <!-- END SEARCH BOX -->
            </div>

            </div>
    </section>
    <b-modal :active.sync="isModalOpen" :can-cancel="true" >
       <!-- <div class="close-modal" @click="()=>isModalOpen=false">X</div>-->
        <div class="playlists-container">
            <h1 class="titled">Agregar {{songName}} a playlist</h1>
            <div v-for="playlist in playlists">
                <li @click="addTrackToPlaylist(playlist._id)"></b-loading> {{playlist.title}} <i  class="fas fa-plus add-track"></i></li>
                <span>{{ playlist.songs.length}} songs</span>
            </div>
        </div>
    </b-modal>

</div>
</template>

<script>
import axios from "axios";
import Login from '@/Components/Login'

export default {
  components: {
      'app-login' : Login
    },

    data() {
        return {
            isFullPage: true,
            playlists: [],
            songName: '',
            songsList: [],
            songName: '',
            songId: '',
            errorMessage: '',
            currentSong: '',
            isLoading: false,
            isModalOpen: false,
            error: false
        }
    },
    mounted() {
        this.getPlaylists();
        setTimeout(() => {
            document.getElementById('search').focus();
        }, 500);
    },
    methods: {
        getPlaylists() {
            axios.get("http://127.0.0.1:3000/getPlaylists")
                .then((response) => {
                    if (response.status == 200) {
                        this.playlists = response.data;
                    }
                }).catch((err) => {
                    console.log('ERROR: ', err)
                })
        },
        searchSong(e) {
            if(this.songName.length > 2) {
                this.isLoading = true;
                axios({
                        "method":"GET",
                        "url":"https://deezerdevs-deezer.p.rapidapi.com/search",
                        "headers":{
                        "content-type":"application/octet-stream",
                        "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                        "x-rapidapi-key":"b11d15210emshd9317db6c39b79ep1130adjsnefb3bc7a146a"
                        },"params":{
                        "q": this.songName
                    }
                })
                .then((response)=>{
                    if(response.status==200) {
                        this.error=false;
                        this.isLoading = false;
                        const dataSongs = JSON.stringify(response.data.data);
                        this.songsList = response.data.data;
                        console.log('buscando')
                        if(this.songsList.length===0) {
                            this.errorMessage = 'No hay resultado para la búsqueda.';
                        }
                    }
                })
                .catch((error)=>{
                    this.isLoading = false;
                    this.errorMessage = 'Ha ocurrido un error con la búsqueda, intentalo más tarde.'
                    this.error=false;
                })
            } else {
                this.error=true;
            }
        },

        showSongInfo(song_id, e) {
            this.currentSong = song_id;
            Array.from(document.querySelectorAll('.song-info')).forEach((getVisibleSong) => {
                getVisibleSong.classList.add('is-hidden');
            })
            document.getElementById(song_id).className = 'song-info';
        },

        async openAddTrackToPlaylistModal(songId, songName) {
            this.songId = songId;
            this.songName = songName;
            this.isModalOpen=true;
        },
        addTrackToPlaylist(playlistId) {
            this.isLoading = true;
             axios.post("http://127.0.0.1:3000/add-song-toplaylist",  {
                data: {
                    songId: this.songId,
                    playlistId
                }})
                .then((response)=>{
                    
                    if(response.status==200) {
                        this.isLoading = false;
                        //this.isModalOpen = false;
                            if(response.data.status==='TRACK_ADD_SUCCESS') {
                                this.$buefy.toast.open({
                                    duration: 1500,
                                    message: 'Se ha añadido la canción a tu playlist',
                                    type: 'is-info is-top-right',
                                    queue: false
                                })
                                this.getPlaylists();
                            } else {
                                this.$buefy.toast.open({
                                    duration: 1500,
                                    message: 'Esta canción ya está en tu playlist',
                                    type: 'is-danger is-top-right',
                                    queue: false
                                })
                            }
                    }
                })
                .catch((error)=>{
                    this.isLoading = false;
                    this.isModalOpen = false;
                    this.$buefy.toast.open({
                        duration: 1500,
                        message: 'Ha ocurrido un error, intentalo más tarde.',
                        type: 'is-warning is-top-right',
                        queue: false
                    })
                })
        }
    
    }
}
</script>
<style>
.add-track {
    color: #23d160;
    font-size: 1.4em;
}
.playlists-container {
    color: #fff;
}
.playlists-container li {
    transition-duration: .1s;
    font-size: 1.5em;
    list-style: none;
}
.playlists-container li:hover {
    font-size: 2em;
    cursor: pointer;
    color: #fecd51;
}
h1 {
    font-size: 2.4em;
    text-align: center;
}
 h1.titled {
    font-size: 3em;
    color: #fff;
}
.song-cover {
    transition-duration: .4s;
    height: 249px;
    width: 250px !important;
    transform: scale(.7);
    position: relative;
}
.song-cover:hover .overlay-song-info {
    display: block;
}
.song-info {
    transition-duration: .4s;
    font-size: 6em;
    color: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;

}
.overlay-song-info {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.81);
}

.search-song.error {
    border-color: #e66464 !important;
}
.search-song.error::placeholder {
    color:  #e66464;
}
.song {
    background-color: #000;
    margin-left: 10px;
}
.search-song {
    height: 40px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #888;
    background-color: transparent;
    color: #ddd;
    text-align: center;
    font-size: 1.3em;
    transition-duration: .4s;
}
.search-song::placeholder {
    color: #ddd;
}
.search-song:focus {
    outline: none;
    border-color: #fff;
}

.song-info span {
    font-size: 22px;
    color: white;
}

.song-info p {
    font-size: .5em;
}


.search-info-text {
    font-size: .7em;
    padding: 10px 0 0 0;
    color: #dcdcdc;
}
</style>
