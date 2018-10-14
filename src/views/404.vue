<template>
<section class="">
  <div class="columns">
    <div class="column has-text-centered">
    <h1 class="title">Nothing to show</h1>
    <p>Looks like the resource you are looking for does not exist.</p>
    <p class="button" v-on:click="lib_goToBlock(lastBlock)">Go to last block</p>
    </div>
    <div class="column">
    </div>
  </div>
</section>
</template>

<script>


export default {
  name: '404',
  components: {

  },
  data() {
    return ({
    });
  },
  mounted() {
    this.currentBlock = parseInt(this.$route.params.blocknumber);
  },
  watch: {

  },
  computed: {
    lastBlock() {
      return (this.$store.state.lastBlock);
    },
  },

};
</script>
