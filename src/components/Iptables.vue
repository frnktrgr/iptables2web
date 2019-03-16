<template>
  <div class="hello">
    <div class="card m-2" v-for="table in tables" v-bind:key="table.$.name">
      <div class="card-header" v-on:click="toggleChains(table.$.name)" style="cursor: pointer;">
        <h4>
        Table <span class="text-monospace">{{ table.$.name }}</span>
        <div class="float-right">
          <i class="far fa-eye-slash" v-if="isVisible(table.$.name)"></i><i class="far fa-eye" v-if="!isVisible(table.$.name)"></i>
        </div>
        </h4>
      </div>
      <div class="card-body" v-if="isVisible(table.$.name)">
        <template v-if="table.chain">
          <Chain v-for="chain in table.chain" v-bind:key="chain.$.name" v-bind:chain="chain" v-bind:table="table"/>
        </template>
      </div>
    </div>
    <div class="modal fade" id="ajaxErrorModal" tabindex="-1" role="dialog" aria-labelledby="ajaxErrorModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ajaxErrorModalLabel">HTTP Status Code {{ jqXHR.status }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <template v-if="typeof jqXHR == 'object'">
              <template v-if="typeof jqXHR.responseJSON == 'object'">
                <dl class="row text-danger">
                  <template v-for="(value, key) in jqXHR.responseJSON">
                    <dt class="col-sm-3">{{ key }}</dt>
                    <dd class="col-sm-9">{{ value }}</dd>
                  </template>
                </dl>
              </template>
              <template v-else>
                <p class="lead text-danger">{{ jqXHR.responseText }}</p>
              </template>
              readystate: {{ jqXHR.readyState }}
            </template>
            <template v-else>
              <p class="lead text-danger">unknown error message</p>
            </template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Chain from "./Chain";

  const $ = require('jquery');
  window.$ = $;
  let localData = {
    hiddens: [],
    tables: [],
    raw: {},
    debug: {},
    jqXHR: {},
  };
export default {
  name: 'Iptables',
  props: {
    dataUrl: String,
  },
  components: {
    Chain,
  },
  data: function() {
    return localData;
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
      let vm = this;
      let parseString = require('xml2js').parseString;
      let url = '/cgi-bin/iptables2xml';
      if (vm.dataUrl) {
        url = vm.dataUrl;
      }
      console.log("loading data from " + url);
      $.ajax({
        url: url,
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
  /* redirects main window when AJAX request indicates that the session has expired on the backend. */
  function checkSession(event, xhr) {
    if (xhr.readyState == 4)
    {
      if(xhr.getResponseHeader("Login-Screen") != null && xhr.getResponseHeader("Login-Screen").length)
      {
        window.location.href='sessionExpired.html'; //whatever
      }
    }
  }
  function errorHandle(event, jqXHR) {
    localData.jqXHR = jqXHR;
    console.log(jqXHR);
    $('#ajaxErrorModal').modal('show');
  }
  $(function() {
    $(document).ajaxComplete(checkSession);
    $(document).ajaxError(errorHandle);
  });



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
