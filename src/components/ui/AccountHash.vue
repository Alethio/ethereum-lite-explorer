<template>
<div v-if="value != null" class="hash">

  <v-popover
  trigger="hover"
  placement="top"
  >
  <!-- This will be the popover target (for the events and position) -->
  <router-link  :to="{ name: 'account', params: { address: value }}" class="tooltip-target">{{ value | cleanHash }}</router-link>
  <template slot="popover">
    <p>
    <strong>
      {{value}}
    </strong>
    </p>
  </template>
</v-popover>

</div>
</template>

<script>
export default {
  name: 'AccountHash',
  props: {
    value: String,
    number: Number,
  },
  components: {

  },
  filters: {
    cleanHash(string) {
      if (string == null) { return ''; }
      string = string.toLowerCase();
      const midpoint = Math.ceil(string.length / 2);
      const toremove = string.length - 10;
      const lstrip = Math.ceil(toremove / 2);
      const rstrip = toremove - lstrip;
      return (`${string.substring(0, midpoint - lstrip)} ... ${
        string.substring(midpoint + rstrip)}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tooltip-target {
  color: rgb(39, 54, 86);
}

.hash {
  background-color: rgb(208, 222, 242);
  float: left;
  padding-right: 7px;
  padding-left: 7px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
}


</style>
