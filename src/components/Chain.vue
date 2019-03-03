<template>
  <div>
    <div>
      Chain <span class="text-monospace">{{ chain.$.name }}</span>
      (<template v-if="chain.$.policy">policy <span class="text-monospace">{{ chain.$.policy }}</span>&nbsp;</template>
      <span class="text-monospace">{{ chain.$['packet-count'] }}</span>
      packets, <span class="text-monospace">{{ chain.$['byte-count'] }}</span> bytes)
    </div>
    <template v-if="chain.rule">
      <table class="table">
        <thead>
        <tr>
          <th scope="col" style="width:1em;">num</th>
          <th scope="col" style="width:1em;">pkts</th>
          <th scope="col" style="width:1em;">bytes</th>
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
    </template>
  </div>
</template>

<script>
  import Rule from "./Rule";

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
