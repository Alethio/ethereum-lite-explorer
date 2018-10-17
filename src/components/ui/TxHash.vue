<template>
  <div class="wrapper">
    <div v-if="value != null" class="hash">
        <div class="tooltip-target">{{ value | cleanHash }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TxHash',
  props: {
    value: String,
  },
  components: {

  },
  filters: {
    cleanHash(string) {
      if (string == null) { return ''; }
      string = string.toLowerCase();
      const midpoint = Math.ceil(string.length / 2);
      const toremove = string.length - 12;
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

.wrapper {
  padding: 10px 8px;
}
.hash {
  background-color: rgb(39, 54, 86);
  color: rgb(255, 255, 255);
  padding: 1px 8px 3px;
  font-size: 20px;
  letter-spacing: 0.2px;
  line-height: 24px;
  font-weight: 500;
}


</style>
