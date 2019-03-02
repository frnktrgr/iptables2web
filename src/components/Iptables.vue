<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="btn btn-primary" v-on:click="updateRules">Rulez</button>
    <div class="card" v-for="table in tables" v-bind:key="table.$.name">
      <div class="card-header">
        Table <span class="text-monospace">{{ table.$.name }}</span>
      </div>
      <div class="card-body">
        <template v-if="table.chain">
          <Chain v-for="chain in table.chain" v-bind:key="chain.$.name" v-bind:chain="chain"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Chain from "./Chain";

  const $ = require('jquery')
  window.$ = $
export default {
  name: 'Iptables',
  props: {
    msg: String
  },
  components: {
    Chain,
  },
  data: function() {
    return {
      tables: [],
      raw: {},
      debug: {},
    }
  },
  computed: {
  },
  methods: {
    updateRules: function() {
      var vm = this;
      var parseString = require('xml2js').parseString;
      $.ajax({
        url: '/cgi-bin/iptables2xml',
        dataType: 'text',
        success: function(xml) {
          vm.raw = xml;
          vm.tables = [];
          parseString(vm.raw, function (err, result) {
            if (err) {
              alert("TODO err: " + err);
            } else {
              vm.debug = result;
              if ('iptables-rules' in result) {
                if ('table' in result['iptables-rules']) {
                  if (typeof result['iptables-rules'] == 'object') {
                    vm.tables = result['iptables-rules']['table'];
                  }
                }
              }
            }
          });
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
