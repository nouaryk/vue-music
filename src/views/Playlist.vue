<template>
    
<div class="column is-8 main-content">
    <h2 class="title">{{ playlistTitle }}</h2>
    
    <div v-if="songs.length==0">
        <p><i>Vaya... Parece que la playlist está vacia.</i> </p>
        <br />
        <button class="button is-medium is-white is-fullwidth" @click="$router.push('/')"><i class="fas fa-search"></i>&nbsp; Buscar canciones</button>
    </div>
    
    <div v-else>
        <li @click="playSong(song.preview)" class="playlist" v-for="song in songs">
          <div class="song-thumb is-pulled-left"><img :src="song.album.cover_small" alt=""></div>  {{ song.artist.name + ' - ' + song.title }} <span class="time">{{ formatDuration(song.duration+"") }}</span>
        <span v-if="" class="is-pulled-right"><i :title="song.title" @click="deleteSong(song.id)" class="fas fa-trash-alt"></i></span>
        </li>
    </div>

    <div>
        <br />
    <button class="button is-medium is-fullwidth is-dark" @click="$router.push('/account/playlists')"><i class="fas fa-bars"></i>&nbsp; Volver a mis playlists</button>
        
        
    </div>
</div>
</template>

<script>
import axios from "axios";
import Login from '@/Components/Login'

export default {

    data() {
        return {
           songs: [],
           playlistTitle: '',
        }
    },
    mounted() {
        this.getPlaylist();
    },
    methods: {
        getPlaylist() {
            this.songs = [];
            axios.get(`http://127.0.0.1:3000/getPlaylist/${this.$route.params.id}`)
                .then((response) => {
                    if (response.status == 200) {
                        
                        this.playlistTitle = response.data[0].title;
                        response.data[0].songs.forEach((song) => {
                            axios({
                                "method":"GET",
                                "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${song}`,
                                "headers":{
                                "content-type":"application/octet-stream",
                                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                                "x-rapidapi-key":"b11d15210emshd9317db6c39b79ep1130adjsnefb3bc7a146a"
                            }
                            })
                            .then((response)=>{
                                this.songs.push(response.data);
                                console.log(response.data)
                                
                            })
                            .catch((error)=>{
                                console.log(error)
                            })
                        })
                    }
                }).catch((err) => {
                    console.log('ERROR: ', err);
                })
        },
        deleteSong(songId) {
        console.log(songId)

        this.$buefy.dialog.confirm({
          title: `Eliminar ${event.target.title} `,
          message: '¿Estás seguro de que quieres eliminar esta canción ?',
          confirmText: 'Eliminar',
          onConfirm: () => {
            this.isLoading = true;
            axios.post(`http://127.0.0.1:3000/playlist/delete/song`,{
                data: {
                    playlistId: this.$route.params.id,
                    songId
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.getPlaylist();
                        this.isLoading = false;
                    }
                }).catch((err) => {
                    console.log('ERROR: ', err);
                    this.isLoading = false;
                })
          }
      })
      

           
        },
        playSong(song) {
            //var audio = new Audio(song);
            //audio.load();
            //audio.play();
        },
        formatDuration(duration) {
            return duration.substring(0,1) + ":"+ duration.substring(1,duration.length);
        },
    }
}
</script>
<style>

li.playlist {
    position: relative;
    list-style: none;
    font-size: 1em !important;
    color: #fff;
    height: 56px;
    background-color: #524b5d;
    padding-left: 70px;
    padding-right: 20px;
    box-sizing: border-box;
    line-height: 56px;
    margin-bottom: 5px;
    transition-duration: .09s;
}
li.playlist:hover {
    transform: scale(1.01);
    background-color: #4b4356;

}
li span i {
    line-height: 56px !important;
    opacity: .7;
    transition-duration: .02s;
}
li span i:hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.4);
}
span.time {
    font-size: .6em;
    color: #e3e3e3;
}

.song-thumb {
    position: absolute;
    left:0;
    top:0;
}

</style>
