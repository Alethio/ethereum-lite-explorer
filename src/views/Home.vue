<template>
<section class="">
  <div class="columns">
    <div class="column has-text-centered">
    <h1 class="title">hello there</h1>
    <p>this is the lighweight block explorer in the future we can put some general graphs here...</p>
    <p class="button" v-on:click="lib_goToBlock(lastBlock)">Go to last block</p>
    </div>
    <div class="column">
    </div>
  </div>
</section>
</template>

<script>


export default {
  name: 'home',
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
