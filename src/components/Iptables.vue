<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="btn btn-primary" v-on:click="updateRules">Rulez</button>
    <div class="card m-2" v-for="table in tables" v-bind:key="table.$.name">
      <div class="card-header">
        <h4>
        Table <span class="text-monospace">{{ table.$.name }}</span>
        <div class="float-right">
          <a href="javascript:void(0)" title="Toggle" v-on:click="toggleChains(table.$.name)"><i class="far fa-eye-slash" v-if="isVisible(table.$.name)"></i><i class="far fa-eye" v-if="!isVisible(table.$.name)"></i></a>
        </div>
        </h4>
      </div>
      <div class="card-body" v-if="isVisible(table.$.name)">
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
      hiddens: [],
      tables: [],
      raw: {},
      debug: {},
    }
  },
  computed: {
  },
  methods: {
    isVisible: function(tableName) {
      let index = this.hiddens.indexOf(tableName);
      if (index !== -1) {
        return false;
      }
      return true;
    },
    toggleChains: function(tableName) {
      console.log("toggle " + tableName);
      let index = this.hiddens.indexOf(tableName);
      if (index !== -1) {
        this.hiddens.splice(index, 1);
      } else {
        this.hiddens.push(tableName);
      }
    },
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
