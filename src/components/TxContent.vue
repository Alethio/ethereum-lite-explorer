
<template>
<div class="block-content">
  <div class="flex-box">
    <div class="pair">
      <div class="label minW130">Hash</div>
      <TxHash :value="tx.hash" />
    </div>
    <div class="pair">
      <div class="tx-value-label">Value</div>
      <div class="value">
        {{ tx.value_eth}} ETH
      </div>
    </div>
  </div>
  <div class="flex-box">
    <div class="pair">
      <div class="label minW130">Block</div>
      <BlockNumber :value="tx.blockNumber" :isLink="true"/>
    </div>
  </div>
  <div class="flex-box">
    <div class="pair">
      <div class="label minW130">From</div>
      <AccountHash :value="tx.from" />
    </div>
    <div class="pair">
      <div class="label">To</div>
      <AccountHash :value="tx.to" />
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">FROM</span>
        </div>
        <div class="column is-3">
          <AccountHash :value="tx.from" />
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">TO</span>
        </div>
        <div class="column is-3">
          <AccountHash :value="tx.to" />
        </div>
      </div>
    </div>
  </div>
  <hr>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Position</span>
        </div>
        <div class="column is-3">
          {{ tx.transactionIndex}}
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Nonce</span>
        </div>
        <div class="column is-3">
          {{ tx.nonce}}
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Gas Limit</span>
        </div>
        <div class="column is-3">
          {{ tx.gas}}
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Gas price</span>
        </div>
        <div class="column is-3">
          {{ tx.gasPrice}}
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Gas used</span>
        </div>
        <div v-if="tx.receipt != null" class="column is-3">
          {{ tx.receipt.gasUsed}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import Vue from 'vue';

import Hash from '@/components/ui/Hash.vue';
import TxHash from '@/components/ui/TxHash.vue';
import AccountHash from '@/components/ui/AccountHash.vue';
import BlockNumber from '@/components/ui/BlockNumber.vue';
import AddressLink from '@/components/ui/AddressLink.vue';
import TransactionLink from '@/components/ui/TransactionLink.vue';


export default {
  name: 'TxContent',
  props: {
    currentHash: String,
  },
  components: {
    AddressLink, TransactionLink, Hash, TxHash, AccountHash, BlockNumber,
  },
  data() {
    return ({
      tx: {},
      tx_uid: '',
      events: [],
    });
  },
  watch: {
    async currentHash() {
      if (this.currentHash != '') {
        const context = this;
        // We save a UUID to prevent old callbacks from also giving their results
        context.tx_uid = this.lib_UID();
        const uid = context.tx_uid;

        // We get the block to iterate all his transactions
        context.lib_getTransaction(context.currentHash, true, (err, tx) => {
          console.log(tx);
          context.tx = tx;
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  display: inline-block;
}
</style>
