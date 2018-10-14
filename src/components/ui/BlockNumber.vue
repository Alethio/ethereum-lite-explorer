<template>
<div>
<div v-if="value != null && !isLink" class="block_number">
  #{{ value }}
</div>
<router-link  :to="{ name: 'block', params: { blocknumber: value }}" v-if="value != null && isLink" class="block_number">
  #{{ value }}
</router-link>
</div>
</template>

<script>
export default {
  name: 'Hash',
  props: {
    value: Number,
    isLink: Boolean,
  },
  components: {

  },
  filters: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.block_number {
  background-color: rgb(53, 124, 255);
  color: rgb(255, 255, 255);
  float: left;
  padding-right: 7px;
  padding-left: 7px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
}


</style>
