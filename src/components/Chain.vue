<template>
  <div>
    <div>
      Chain <span class="text-monospace">{{ chain.$.name }}</span>
      (<template v-if="chain.$.policy">policy <span class="text-monospace">{{ chain.$.policy }}</span>&nbsp;</template>
      <span class="text-monospace">{{ chain.$['packet-count'] }}</span>
      packets, <span class="text-monospace">{{ chain.$['byte-count'] }}</span> bytes)
    </div>
    <template v-if="chain.rule">
      <div class="container">
        <div class="row">
          <div class="col">
            num
          </div>
          <div class="col">
            pkts
          </div>
          <div class="col">
            bytes
          </div>
          <div class="col">
            target
          </div>
          <div class="col">
            prot
          </div>
          <div class="col">
            opt
          </div>
          <div class="col">
            in
          </div>
          <div class="col">
            todo
          </div>
        </div>
        <Rule v-for="(rule, index) in chain.rule" v-bind:rule="rule" v-bind:index="index" v-bind:key="index"/>
      </div>
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
