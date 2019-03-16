<template>
  <div>
    <a v-bind:id="chainAnchor" class="text-monospace" style="display: block; position: relative; top: -70px; visibility: hidden;"></a>
    <h5>
      Chain <span class="text-monospace">{{ chain.$.name }}</span>
      (<template v-if="chain.$.policy">policy <span class="text-monospace">{{ chain.$.policy }}</span>&nbsp;</template>
      <span class="badge badge-primary text-monospace">{{ humanReadable10(chain.$['packet-count']) }}</span>
      packets, <span class="badge badge-secondary text-monospace">{{ humanReadable2(chain.$['byte-count']) }}</span> bytes)
    </h5>
    <div class="table-responsive" v-if="chain.rule">
      <table class="table table-striped">
        <thead>
        <tr>
          <th class="d-md-none" scope="col">conditions</th>
          <th scope="col" style="width:1em;" class="d-none d-md-table-cell">num</th>
          <th scope="col" style="width:1em;" class="d-none d-md-table-cell">pkts</th>
          <th scope="col" style="width:1em;" class="d-none d-md-table-cell">bytes</th>
          <th scope="col">target</th>
          <th scope="col" class="d-none d-md-table-cell">prot</th>
          <th scope="col" class="d-none d-md-table-cell">opt</th>
          <th scope="col" class="d-none d-md-table-cell">in</th>
          <th scope="col" class="d-none d-md-table-cell">out</th>
          <th scope="col" class="d-none d-md-table-cell">source</th>
          <th scope="col" class="d-none d-md-table-cell">destination</th>
          <th scope="col">leftover</th>
        </tr>
        </thead>
        <tbody>
        <Rule v-for="(rule, index) in chain.rule" v-bind:rule="rule" v-bind:table="table" v-bind:index="index" v-bind:key="index"/>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Rule from "./Rule";
  import { humanReadable10, humanReadable2 } from "../helpers";

  export default {
  name: 'Chain',
  props: {
    chain: Object,
    table: Object,
  },
  components: {
    Rule,
  },
  data: function() {
    return {

    }
  },
  computed: {
    chainAnchor: function() {
      return this.table.$.name + "_" + this.chain.$.name;
    }
  },
  methods: {
    humanReadable10: humanReadable10,
    humanReadable2: humanReadable2,
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
