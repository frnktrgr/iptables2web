<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="javascript:void(0)">iptables2web</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Todo" aria-label="Todo">
          <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="updateRules">Load</button>
        </div>
      </div>
    </nav>
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <Iptables msg="Test" ref="iptables"/>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
import Iptables from "./components/Iptables";

export default {
  name: 'app',
  components: {
    Iptables,
  },
  methods: {
    updateRules: function() {
      this.$refs.iptables.updateRules();
    }
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
