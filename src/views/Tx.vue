<template>
<div id="block" class="columns is-fullheight is-mobile">
  <div class="column is-3 sidebar">
    <TxSidebarNav :currentHash="currentTx"  />
  </div>
  <div class="column is-9 content">
    <TxContent :currentHash="currentTx" />
  </div>
</div>
</template>

<script>
import TxSidebarNav from '@/components/TxSidebarNav.vue';
import TxContent from '@/components/TxContent.vue';

export default {
  name: 'block',
  components: {
    TxSidebarNav,
    TxContent,
  },
  data() {
    return ({
      currentTx: '',
    });
  },
  mounted() {
    this.currentTx = this.$route.params.hash;
  },
  watch: {
    $route(to, from) {
      this.currentTx = this.$route.params.hash;
    },
  },

};
</script>
