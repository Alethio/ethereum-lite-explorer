<template>
<div id="block" class="columns is-fullheight is-mobile flex-box">
  <div class="column is-3 sidebar blockSidebar tx-sideBar">
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
    this.checkIfExist();
  },
  watch: {
    $route(to, from) {
      this.currentTx = this.$route.params.hash;
      this.checkIfExist();
    },
  },
  methods: {
    checkIfExist() {
      if (this.currentTx != null && this.currentTx != '') {
        var context = this;
        console.log('dfhfdshf', this.currentTx)
        this.lib_getTransaction(this.currentTx, false, function(err, tx) {
        console.log(err, tx)
          if (err || tx == null) {
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
