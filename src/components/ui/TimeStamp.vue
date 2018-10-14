<template>
<div v-if="value != null" class="hash">

  <v-popover
  trigger="hover"
  placement="top"
  >
  <!-- This will be the popover target (for the events and position) -->
  <div  v-on:click="showTimeAgo = !showTimeAgo" class="tooltip-target cursor" >
    <Timeago v-if="showTimeAgo" :datetime="value * 1000" />
    <p v-if="!showTimeAgo">{{value | timestampToText}}</p>
  </div>
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
  name: 'TimeStamp',
  props: {
    value: Number,
  },
  components: {

  },
  data() {
    return ({
      showTimeAgo: true,
    });
  },
  filters: {
    timestampToText(timestamp) {
      var d = new Date(timestamp * 1000);
      return (d.toLocaleString());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.cursor {
  cursor: pointer;
}


</style>
