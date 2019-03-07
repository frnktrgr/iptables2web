<template>
  <div>
    <h5>
      Chain <span class="text-monospace">{{ chain.$.name }}</span>
      (<template v-if="chain.$.policy">policy <span class="text-monospace">{{ chain.$.policy }}</span>&nbsp;</template>
      <span class="text-monospace">{{ humanReadable10(chain.$['packet-count']) }}</span>
      packets, <span class="text-monospace">{{ humanReadable2(chain.$['byte-count']) }}</span> bytes)
    </h5>
    <div class="table-responsive" v-if="chain.rule">
      <table class="table">
        <thead>
        <tr>
          <th scope="col" style="width:1em;" class="d-none d-sm-table-cell">num</th>
          <th scope="col" style="width:1em;" class="d-none d-sm-table-cell">pkts</th>
          <th scope="col" style="width:1em;" class="d-none d-sm-table-cell">bytes</th>
          <th scope="col">target</th>
          <th scope="col">prot</th>
          <th scope="col">opt</th>
          <th scope="col">in</th>
          <th scope="col">out</th>
          <th scope="col">source</th>
          <th scope="col">destination</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <Rule v-for="(rule, index) in chain.rule" v-bind:rule="rule" v-bind:index="index" v-bind:key="index"/>
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
    chain: Object
  },
  components: {
    Rule,
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
