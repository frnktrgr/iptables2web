<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="btn btn-primary" v-on:click="updateRules">Rulez</button>
  </div>
</template>

<script>
export default {
  name: 'Iptables',
  props: {
    msg: String
  },
  data: function() {
    return {
      tables: {},
    }
  },
  methods: {
    updateRules: function() {
      var vm = this;
      $.ajax({
        url: 'dummy.xml',
        success: function(data) {
          alert(data);
          vm.tables = data;
        },
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
