<template>
<div style="height:100%; width: 100%" class="hello">
  <div v-for="elem in elements" style="display:inline-block;">
    <div  v-tooltip.top-center="elem.id" class="item_container" v-on:click="$emit('item_clicked', elem.id)">
      <div v-bind:class="{ item: true, selected: elem.selected }" :style="{} | computeSize(elem.value, maximum)"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GridList',
  props: {
    elements: Array,
    maximum: Number,
  },
  watch: {
    metric(a, b) {
      console.log(a, b);
    },
  },
  filters: {
    computeSize(pipe, value, max) {
      return ({
        margin: `${100 - ((value / max) * 100) / 2}%`,
        width: `${(value / max) * 100}%`,
        height: `${(value / max) * 100}%`,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item_container {
  padding: 1px;
  width: 30px;
  height: 30px;
}

.item_container:hover {
  cursor: pointer;
}

.item {
  border-radius: 50%;
  border: 2px;
  background-color: rgb(39, 54, 86);
  border-color: rgb(39, 54, 86);
  border-style: solid;
}

.item:hover {
  border-color: rgb(39, 54, 86);
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}

.selected {
  background-color: rgb(53, 124, 255);
  border-color: rgb(53, 124, 255);
}
</style>
