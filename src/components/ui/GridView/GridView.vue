<template>
<div style="height:100%; width: 100%" class="hello txList">
  <div v-for="elem in elements">
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
        // margin: `${100 - ((value / max) * 100) / 2}%`,
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
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.item_container:hover {
  cursor: pointer;
}

.item_container:hover .item{
  border-color: rgb(39, 54, 86);
  background-color: rgb(255, 255, 255);
}


.item {
  border-radius: 50%;
  border: 2px;
  background-color: #D0DEF2;
  border-color: #D0DEF2;
  border-style: solid;
  box-sizing: border-box;
}

.item:hover {
  border-color: rgb(39, 54, 86);
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}

.selected {
  background-color: rgb(39, 54, 86);
  border-color: rgb(39, 54, 86);
}
</style>
