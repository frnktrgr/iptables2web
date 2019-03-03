<template>
  <tr class="text-monospace">
    <th>{{ index+1 }}</th>
    <td>{{ rule.$['packet-count'] }}</td>
    <td>{{ rule.$['byte-count'] }}</td>
    <td>{{ getTarget(rule.actions) }}</td>
    <td>{{ getProt(rule.conditions) }}</td>
    <td>--</td>
    <td>{{ getIn(rule.conditions) }}</td>
    <td>{{ getOut(rule.conditions) }}</td>
    <td>{{ getSource(rule.conditions) }}</td>
    <td>{{ getDestination(rule.conditions) }}</td>
    <td>{{ getLeftover(rule.conditions) }}</td>
  </tr>
</template>

<script>
  function jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }
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
    getTarget: function(actions) {
      if (actions && typeof actions == 'object' && actions[0] && typeof actions[0] == 'object') {
        var action = actions[0];
        if ('call' in action) {
          return Object.keys(action.call[0])[0];
        }
        return Object.keys(action)[0];
      }
      return "bar";
    },
    getProt: function(conds) {
      let match = this.getMatch(conds);
      if (match && 'p' in match) {
        return match.p.join(', ');
      }
      return 'all';
    },
    getIn: function(conds) {
      let vm = this;
      let match = this.getMatch(conds);
      if (match && 'i' in match) {
        let values = [];
        match.i.forEach(function(value) {
          values.push(vm.getValue(value));
        });
        return values.join(', ');
      }
      return '*';
    },
    getOut: function(conds) {
      let vm = this;
      let match = this.getMatch(conds);
      if (match && 'o' in match) {
        let values = [];
        match.o.forEach(function(value) {
          values.push(vm.getValue(value));
        });
        return values.join(', ');
      }
      return '*';
    },
    getSource: function(conds) {
      let vm = this;
      let match = this.getMatch(conds);
      if (match && 's' in match) {
        let values = [];
        match.s.forEach(function(value) {
          values.push(vm.getValue(value));
        });
        return values.join(', ');
      }
      return '*';
    },
    getDestination: function(conds) {
      let vm = this;
      let match = this.getMatch(conds);
      if (match && 'd' in match) {
        let values = [];
        match.d.forEach(function(value) {
          values.push(vm.getValue(value));
        });
        return values.join(', ');
      }
      return '*';
    },
    getLeftover: function(conds) {
      let vm = this;
      if (conds) {
        let condsCopy = jsonCopy(conds);
        let match = this.getMatch(condsCopy);
        if (match) {
          delete match.p;
          delete match.i;
          delete match.o;
          delete match.s;
          delete match.d;
          if (!Object.keys(match) || Object.keys(match).length == 0) {
            delete condsCopy[0].match;
          }
        }
        let leftoverValues = [];
        condsCopy.forEach(function(loValue) {
          if (typeof loValue == 'object' && 'comment' in loValue) {
            let str = vm.getRecLeftover(loValue.comment[0].comment);
            leftoverValues.push('/* ' + str.substring(1, str.length - 1) + ' */');
          } else {
            leftoverValues.push(vm.getRecLeftover(loValue));
          }
        });
        return leftoverValues.join(', ');
      }
      return '';
    },
    getRecLeftover: function(lo) {
      let vm = this;
      if (typeof lo == 'object') {
        let los = [];
        Object.keys(lo).forEach(function(loKey) {
          let prefix = loKey + ' ';
          if (loKey == 0) {
            prefix = '';
          }
          los.push(prefix + vm.getRecLeftover(lo[loKey]));
        });
        return los.join(' ')
      }
      return lo;
    },
    getValue: function(value) {
      if (typeof value == 'object') {
        if ('_' in value) {
          if ('$' in value && value.$.invert === '1') {
            return '!'+value['_'];
          }
        }
      }
      return value;
    },
    getMatch: function(conds) {
      if (conds && typeof conds == 'object' && conds[0] && typeof conds[0] == 'object') {
        let cond = conds[0];
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
