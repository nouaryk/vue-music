<template>
    <section class="sidebar-menu">
        <ul>
            <li :class="{'small-text': !shown}" @click="$router.push('/')" class="active">
                <i class="fas fa-home"></i> <br /><span v-if="shown">Inicio</span>
            </li>
            
            <li v-if="$store.state.logged" :class="{'small-text': !shown}" @click="$router.push('/account/dashboard')">
                <i class="fas fa-music"></i> <br /><span v-if="shown">Playlists</span>
            </li>

            <li v-if="$store.state.logged" :class="{'small-text': !shown}" @click="$router.push('/account/settings')">
                <i class="fas fa-user-alt"></i> <br /><span v-if="shown">Mi perfil</span>
            </li>

            <li v-if="!$store.state.logged" :class="{'small-text': !shown}" @click="$router.push('/')">
                <i class="fas fa-lock"></i> <br /><span v-if="shown">Entrar</span>
            </li>
            <li v-if="!$store.state.logged" :class="{'small-text': !shown}" @click="$router.push('/register')">
                <i class="fas fa-user-plus"></i> <br /><span v-if="shown">Registro</span>
            </li>

           
            
            <li class="bottom" :class="{'small-text': !shown}" @click="() => {
                if(shown) {
                    hideSideBar()
                } else {
                    showSideBar()
                    }
                }">
                <i :class="[shown  ? 'fas fa-caret-square-left': 'fas fa-caret-square-right']"></i>
            </li>

             <li @click="logout" v-if="$store.state.logged" :class="{'small-text': !shown}">
                <i class="fas fa-sign-out-alt"></i><br/> <span v-if="shown">Salir</span>
            </li>
        </ul>
    </section>

</template>

<style>
    .sidebar-menu {
        background-color: #000;
        height: 100%;
        z-index: 100;
        padding: 5px;
        box-sizing: border-box;
        position: fixed;
        display: -webkit-flex; /* Safari */
        -webkit-align-items: center; /* Safari 7.0+ */
        display: flex;
        align-items: center;
    }
    .sidebar-menu.resized {
        width: 35px;
    }
    ul li {
        opacity: .6;
        color: #fff;
        margin-top: 20px;
        cursor: pointer;
        font-size: .9em;
        text-align: center;
        transition-duration: .3s;

    }
    ul li i {
        font-size: 1.4em;
    }
     ul li:hover, ul li.active {
         opacity: 1;
     }
    li.bottom {
        bottom: 5px;
        position: absolute;
    }
    li.bottom.small i {
        bottom: 5px;
        position: absolute;
        left: 2px;
    }
    .small-text {
        font-size: .9em;
    }
    .show-sidebar {
        font-size: 1.4em;
        position: fixed;
        bottom: 5px;
        left: 15px;

    }

</style>
<script>
import axios from "axios";
    export default {
        name: 'sidebar-menu',
        data:  () => {
            return {
                shown: true
                
            }
        },

        mounted() {
            this.$store.commit('SET_USER_LOGGED', this.$session.exists());
        },
        methods: {
            hideSideBar() {
                this.shown = false;
                document.querySelector('.sidebar-menu').className = 'sidebar-menu resized';
            },
            showSideBar() {
                this.shown = true;
                document.querySelector('.sidebar-menu').className = 'sidebar-menu';
            },

            logout() {
                this.$buefy.dialog.confirm({
                    title: 'Cerrar sesión',
                    message: '¿Estás seguro de que quieres cerrar la sesión ?',
                    confirmText: 'Cerrar sesión',
                    onConfirm: () => {
                        this.$session.destroy();
                        this.$store.commit('SET_USER_LOGGED', false);
                        this.$router.push('/')
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