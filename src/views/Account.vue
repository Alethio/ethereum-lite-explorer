<template>
<div id="account" class="columns" >
  <div class="column is-5 flex-box">
    <div class="account-avatar-container">
      <div class="account-avatar">
        <div class="identicon-container">
          <HashAvatar :hash="currentAddress" />
        </div>
      </div>
    </div>
    <div class="account-content">
      <div class="flex-box">
        <div class="pair">
          <div class="label minW130">Address</div>
          <AccountHash :value="currentAddress" />
        </div>
        <div class="pair">
          <div class="label">Type</div>
          <div class="value" v-if="account.isContract">Contract account</div>
          <div class="value" v-if="account.isContract === false">External Account</div>
        </div>
      </div>
      <div class="flex-box">
        <div class="pair">
          <div class="label minW130">Balance</div>
          <div class="value">{{ account.balance_eth }} ETH</div>
        </div>
      </div>
      <div class="flex-box">
        <div class="label minW130" v-if="account.isContract">Account Code</div>
        <div class="account-code" v-if="account.isContract">{{account.code}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import HashAvatar from '@/components/ui/HashAvatar.vue';
import AccountHash from '@/components/ui/AccountHash.vue';

export default {
  name: 'account',
  components: {
    HashAvatar,
    AccountHash,
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
