<template>
<div id="account" class="columns" >
  <div class="column is-5">
    <center> <HashAvatar :hash="currentAddress" />
    <p>{{currentAddress}}</p>
    <p v-if="account.isContract">Contract account</p>
    <p v-if="account.isContract === false">Account</p>
    </center>
  </div>
  <div class="column is-7">
  <p>
  Balance: {{ account.balance_eth }} ETH
  </p>
  <p v-if="account.isContract">
  Code: </br>
  <pre class="code_block">
  {{account.code}}
  </pre>
  </p>  </div>
</div>
</template>

<script>
import HashAvatar from '@/components/ui/HashAvatar.vue';

export default {
  name: 'account',
  components: {
    HashAvatar,
  },
  data() {
    return ({
      currentAddress: '',
      account: {},
    });
  },
  mounted() {
    this.currentAddress = this.$route.params.address;
  },
  watch: {
    $route(to, from) {
      this.currentAddress = this.$route.params.address;
    },
    currentAddress(to, from) {
      this.account = {};
      const context = this;
      this.lib_getAccount(this.currentAddress, (err, account) => {
        context.account = account;
      });
    },
  },

};
</script>

<style scoped>

.code_block {
  display: block;
  word-wrap: break-word;
  height: 200px;
  max-height: 400px;
  white-space: pre-wrap;
}

</style>
