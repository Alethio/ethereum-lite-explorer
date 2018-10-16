<template>
  <div v-tooltip.top-center="label"
       class="elem"
       :style="{ 'width': percent  + '%', 'height': '100%'}"
       v-on:click="$emit('item_clicked')">
  </div>
</template>


<script>
export default {
  name: 'HorizontalBar',
  props: {
    percent: Number,
    label: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hidden {
  visibility: hidden;
}

.elem {
  margin-top: 4px;
  min-width: 8px;
  margin-bottom: 4px;
  height: 8px;
  border: 2px;
  border-radius: 1px;
  background-color: #D0DEF2;
  border-color: #D0DEF2;
  border-style: solid;
}

.elem:hover {
  border-color: rgb(53, 124, 255);
  background-color: rgb(255, 255, 255);
  cursor:pointer;
}

.selected {
  background-color: rgb(53, 124, 255);
  border-color: rgb(53, 124, 255);
}

</style>
