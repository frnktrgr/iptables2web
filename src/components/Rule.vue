<template>
  <tr class="text-monospace">
    <td class="d-md-none"><span v-html="getCompact(rule.conditions)"></span></td>
    <th class="d-none d-md-table-cell">{{ index+1 }}</th>
    <td class="d-none d-md-table-cell"><span class="badge badge-primary text-monospace">{{ humanReadable10(rule.$['packet-count']) }}</span></td>
    <td class="d-none d-md-table-cell"><span class="badge badge-secondary text-monospace">{{ humanReadable2(rule.$['byte-count']) }}</span></td>
    <td><span v-html="getTarget(rule.actions)"></span></td>
    <td class="d-none d-md-table-cell">{{ getProt(rule.conditions) }}</td>
    <td class="d-none d-md-table-cell">--</td>
    <td class="d-none d-md-table-cell">{{ getIn(rule.conditions) }}</td>
    <td class="d-none d-md-table-cell">{{ getOut(rule.conditions) }}</td>
    <td class="d-none d-md-table-cell">{{ getSource(rule.conditions) }}</td>
    <td class="d-none d-md-table-cell">{{ getDestination(rule.conditions) }}</td>
    <td>{{ getLeftover(rule.conditions) }}</td>
  </tr>
</template>

<script>
  import { humanReadable10, humanReadable2 } from "../helpers";
  function jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }
export default {
  name: 'Rule',
  props: {
    rule: Object,
    table: Object,
    index: Number,
  },
  data: function() {
    return {

    }
  },
  computed: {
  },
  methods: {
    humanReadable10: humanReadable10,
    humanReadable2: humanReadable2,
    getTarget: function(actions) {
      if (actions && typeof actions == 'object' && actions[0] && typeof actions[0] == 'object') {
        var action = actions[0];
        if ('call' in action) {
          return "<a href=#" + this.table.$.name + "_" + Object.keys(action.call[0])[0] + ">" + Object.keys(action.call[0])[0] + "</a>";
        }
        if (Object.keys(action)[0] == 'ACCEPT') {
          return '<i class="fas fa-arrow-alt-circle-right text-success" title="ACCEPT"></i>'
        }
        if (Object.keys(action)[0] == 'RETURN') {
          return '<i class="fas fa-arrow-alt-circle-up text-info" title="RETURN"></i>'
        }
        if (Object.keys(action)[0] == 'REJECT') {
          return '<i class="fas fa-arrow-alt-circle-left text-danger" title="REJECT"></i>'
        }
        if (Object.keys(action)[0] == 'DROP') {
          return '<i class="fas fa-arrow-alt-circle-down text-danger" title="DROP"></i>'
        }
        return Object.keys(action)[0];
      }
      return "bar";
    },
    getCompact: function(conds) {
      let result = "";
      let prot = this.getProt(conds);
      let opt = "--";
      let iin = this.getIn(conds);
      let iout = this.getOut(conds);
      let source = this.getSource(conds);
      let destination = this.getDestination(conds);
      if (prot !== 'all') {
        result += prot;
      }
      if (opt !== '--') {
        result += ' '+opt;
      }
      if (iin !== '*') {
        result += ' <span class="text-nowrap"><i class="fas fa-caret-up" title="in"></i>'+iin+'</span>';
      }
      if (iout !== '*') {
        result += ' <span class="text-nowrap"><i class="fas fa-caret-down" title="out"></i>'+iout+'</span>';
      }
      if (source !== '*') {
        result += ' <span class="text-nowrap"><i class="fas fa-caret-left" title="source"></i>'+source+'</span>';
      }
      if (destination !== '*') {
        result += ' <span class="text-nowrap"><i class="fas fa-caret-right" title="destination"></i>'+destination+'</span>';
      }
      return result;
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
