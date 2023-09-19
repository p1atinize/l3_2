<template>
    <div class="home">
        <div v-if="showChat">
            <div>
                <div :key="i" v-for="(el, i) in chatData">
                    <p style="color: #42b983">{{el.user}}</p>
                    <p style="color: darkblue">{{el.message}}</p>
                </div>
            </div>
            <input type="text" v-model="message">
            <button class="btn" @click="send">Send</button>
        </div>
        <div v-else>
            <input
                placeholder="set name"
                v-model="user.name"
            >
            <button class="btn" @click="saveName" :disabled="!user.name">Save</button>
        </div>
    </div>
</template>

<script>
const { io } = require("socket.io-client");
const socket = io("http://127.0.0.1:3001");

export default {
    name: 'HomeView',
    components: {

    },
    data() {
        return {
            message: null,
            chatData: {},
            user: {
                name: '',
                saved: false,
            },
        }
    },
    methods: {
        send() {
            socket.emit('message', {message: this.message, user: this.user.name});
            this.updateData();
            this.message = '';
        },
        saveName() {
            if(!this.user.name) return;
            this.user.saved = true;
        },
        connect() {
            socket.on("connection", (arg) => {
                console.log(arg);
                this.chatData = arg.chatData;
            });
        },
        updateData() {
            socket.on("updateData", (arg) => {
                console.log(arg.chatData);
                this.chatData = arg.chatData;
            });
        }
    },
    computed: {
        showChat() {
            return this.user.saved;
        }
    },
    mounted() {
        this.connect();
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
