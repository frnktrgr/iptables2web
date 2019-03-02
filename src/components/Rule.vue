<template>
  <div class="row">
    <div class="col">
      {{ index+1 }}
    </div>
    <div class="col">
      {{ rule.$['packet-count'] }}
    </div>
    <div class="col">
      {{ rule.$['byte-count'] }}
    </div>
    <div class="col">
      {{ printTarget(rule.actions) }}
    </div>
    <div class="col">
      {{ printProt(rule.conditions) }}
    </div>
    <div class="col">
      --
    </div>
    <div class="col">
      {{ printIn(rule.conditions) }}
    </div>
    <div class="col">
      <!--{{ rule.conditions }}-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rule',
  props: {
    rule: Object,
    index: Number,
  },
  data: function() {
    return {

    }
  },
  computed: {
  },
  methods: {
    printTarget: function(actions) {
      if (actions && typeof actions == 'object' && actions[0] && typeof actions[0] == 'object') {
        var action = actions[0];
        if ('call' in action) {
          return Object.keys(action.call[0])[0];
        }
        return Object.keys(action)[0];
      }
      return "bar";
    },
    printProt: function(conds) {
      var match = this.getMatch(conds);
      if (match && 'p' in match) {
        return match.p.join(', ');
      }
      return 'all';
    },
    printIn: function(conds) {
      var match = this.getMatch(conds);
      if (match && 'i' in match) {
        return match.i;
      }
      return '*';
    },
    getMatch: function(conds) {
      if (conds && typeof conds == 'object' && conds[0] && typeof conds[0] == 'object') {
        var cond = conds[0];
        if (typeof cond == 'object' && 'match' in cond) {
          return cond.match[0];
        }
      }
      return null;
    },
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
