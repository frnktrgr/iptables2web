<template>
  <div id="app">
    <img src="./assets/logo.png" style="position: fixed; top:-16px; right:-8px; z-index: 1050;" width="96px;" title="iptables2web"/>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="javascript:void(0)">iptables2web v{{version}} <i class="fas fa-circle" v-bind:class="{ 'text-success': autoUpdate, 'text-danger': !autoUpdate }"></i></a>

      <button class="navbar-toggler" style="margin-right: 80px;" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" v-bind:href="homeUrl">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0" style="margin-right: 80px;">
          <input class="form-control mr-sm-2" type="text" style="width: 10em;" placeholder="URL to cgi-bin" aria-label="URL to cgi-bin" v-model="dataUrl" v-bind:disabled="autoUpdate">
          <button class="btn btn-outline-success my-2 my-sm-0 ml-3" v-on:click="updateRules" title="Load"><i class="fas fa-cloud-download-alt"></i></button>
          <button class="btn btn-outline-success my-2 my-sm-0 ml-3" v-on:click="play" v-if="!autoUpdate" title="Start"><i class="fas fa-play"></i></button>
          <button class="btn btn-outline-success my-2 my-sm-0 ml-3" v-on:click="pause" v-if="autoUpdate" title="Pause"><i class="fas fa-pause"></i></button>
          <button v-if="enableLogin" class="btn btn-outline-success my-2 my-sm-0 ml-3" v-on:click="login" title="Login"><i class="fas fa-sign-in-alt"></i></button>
          <button v-if="enableLogin" class="btn btn-outline-success my-2 my-sm-0 ml-3" v-on:click="logout" title="Logout"><i class="fas fa-sign-out-alt"></i></button>
        </div>
      </div>

    </nav>
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <Iptables v-bind:data-url="dataUrl" ref="iptables"/>
  </div>
</template>

<script>
import Iptables from "./components/Iptables";

let localData = {
  homeUrl: process.env.BASE_URL,
  autoUpdate : false,
  dataUrl: '/cgi-bin/iptables2xml',
  enableLogin: false,
  loginUrl: "/mellon/login?ReturnTo=RETURN_TO_URL",
  logoutUrl: "/mellon/logout?ReturnTo=RETURN_TO_URL",
  version: null,
};

fetch('./iptables2web.json')
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +  response.status);
      return;
    }

    response.json().then(function(data) {
      Object.keys(data).forEach(function(key) {
        localData[key] = data[key];
      });
    });
  }
)
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});

export default {
  name: 'app',
  data: function() {
    return localData
  },
  components: {
    Iptables,
  },
  methods: {
    autoUpdateRules: function() {
      if (this.autoUpdate) {
        this.updateRules();
        setTimeout(this.autoUpdateRules, 5000);
      }
    },
    updateRules: function() {
      console.log("updateRules ...");
      this.$refs.iptables.updateRules();
    },
    login: function() {
      window.location.href = this.loginUrl.replace(/RETURN_TO_URL/, window.location.href);
    },
    logout: function() {
      window.location.href = this.logoutUrl.replace(/RETURN_TO_URL/, window.location.href);
    },
    play: function() {
      this.autoUpdate = true;
      this.autoUpdateRules();
    },
    pause: function() {
      this.autoUpdate = false;
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
