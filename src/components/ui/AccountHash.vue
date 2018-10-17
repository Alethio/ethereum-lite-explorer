<template>
  <div class="wrapper">
    <div v-if="value != null" class="hash">
      <router-link  :to="{ name: 'account', params: { address: value }}"
                    class="tooltip-target">{{ value | cleanHash }}
      </router-link>
      <template slot="popover">
        <p>
        <strong>
          {{value}}
        </strong>
        </p>
      </template>
    </div>
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

.tooltip-target {
  color: rgb(39, 54, 86);
}
a {
  text-decoration: none;
}
.hash {
  background-color: rgb(208, 222, 242);
  padding: 1px 8px 3px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
}
  .wrapper {
    padding: 10px 8px;
  }


</style>
