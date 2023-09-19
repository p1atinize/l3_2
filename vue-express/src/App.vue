<template>
  <HomeView msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HomeView from "@/views/HomeView.vue";
// const { io } = require("socket.io-client");
// const socket = io("http://127.0.0.1:3001");

export default {
    name: 'App',
    components: {
        HomeView,
    },
    // mounted() {
    //     socket.on("connection", (arg) => {
    //         console.log(arg);
    //     });
    // }
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
