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
                <div v-if="!$store.state.logged">
                    <app-login></app-login>
                </div>
                <!-- END LOGIN COMPONENT -->
        
            <!-- SEARCH BOX -->
            <div v-else class="columns is-centered is-multiline">
                <div class="column is-12">
                    <h1>Buscar</h1>
                    <input autofocus spellcheck="false" v-model="songName" @keyup="errorMessage=''" @keyup.enter="searchSong" placeholder="Nombre de la canción o album..." class="search-song" />
                    <p class="error">{{errorMessage}}</p>
                </div>
                <div  class="column is-1 song-cover" :key="song.id" v-for="song in songsList" 
                :style="{ 'background-image': 'url(' + song.album.cover_medium + ')' }">
                <div class="overlay-song-info">
                    <div class="song-info" :id="song.id">
                        <i class="fas fa-plus-square"></i><br/>
                        <span>{{song.title}}</span>
                    </div>
                </div>
                    

                </div>
            </div>
            <!-- END SEARCH BOX -->
            </div>

            </div>
        </section>
            
</div>
</template>

<style>
h1 {
    font-size: 3em;
    text-align: center;
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

.error {
    font-size: .8em;
    text-align: center;
    color: #e66464;
    padding: 3px;
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

</style>

<script>
import axios from "axios";
import Login from '@/Components/Login'

export default {
  components: {
      'app-login' : Login
    },

    data() {
        return {
            songName: '',
            songsList: [],
            errorMessage: '',
            currentSong: '',
            isLoading: false
        }
    },

    methods: {
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
                        this.isLoading = false;
                        const dataSongs = JSON.stringify(response.data.data);
                        this.songsList = response.data.data;
                        console.log(dataSongs);
                        if(this.songsList.length===0) {
                            this.errorMessage = 'No hay resultado para la búsqueda.';
                        }
                    }
                })
                .catch((error)=>{
                    this.isLoading = false;
                    this.errorMessage = 'Ha ocurrido un error con la búsqueda, intentalo más tarde.'
                })
            } else {
                this.errorMessage = 'Introduce el nombre de la canción/album o artista.'
            }
        },

        showSongInfo(song_id, e) {
            this.currentSong = song_id;
            Array.from(document.querySelectorAll('.song-info')).forEach((getVisibleSong) => {
                console.log(getVisibleSong)
                getVisibleSong.classList.add('is-hidden');
            })
            document.getElementById(song_id).className = 'song-info';
        }
    
    }
}
</script>
