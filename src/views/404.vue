<template>
<section class="home is-fullheight">
  <div class="error-container">
    <icon-base icon-name="error"
               width="48"
               height="48"
               viewBox="2 2 20 20"
    >
      <icon-error />
    </icon-base>
    <div class="error-text">
      <div>Looks like the resource you are looking for does not exist.</div>
      <div>Try searching for a different one.</div>
    </div>
  </div>
</section>
</template>

<script>

import IconBase from '@/components/icons/IconBase.vue';
import IconError from '@/components/icons/IconError.vue';

export default {
  name: 'NotFounf',
  components: {
    IconBase,
    IconError,
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
