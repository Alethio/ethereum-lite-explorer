<template>
<div id="block" class="columns is-fullheight is-mobile">
  <div class="column is-3 sidebar">
    <BlockSidebarNav :currentBlock="currentBlock" v-on:block_selected="lib_goToBlock($event)" />
  </div>
  <div class="column is-9 content">
    <BlockContent :currentBlock="currentBlock" />
  </div>
</div>
</template>

<script>
import BlockSidebarNav from '@/components/BlockSidebarNav.vue';
import BlockContent from '@/components/BlockContent.vue';

export default {
  name: 'block',
  components: {
    BlockSidebarNav,
    BlockContent,
  },
  data() {
    return ({
      currentBlock: -1,
    });
  },
  mounted() {
    this.currentBlock = parseInt(this.$route.params.blocknumber);
    this.checkIfExist();
  },
  watch: {
    $route(to, from) {
      this.currentBlock = parseInt(this.$route.params.blocknumber);
      this.checkIfExist();
    },
  },
  methods: {
    checkIfExist() {
      if (this.currentBlock != -1) {
        var context = this;
        this.lib_getBlock(this.currentBlock, function(err, block) {
          if (err || block == null) {
            context.$router.push({
              path: `/404`,
            });
          }
        })
      }
    }
  }
};
</script>
