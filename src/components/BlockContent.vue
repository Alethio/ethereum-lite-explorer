
<template>
<div style="">
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">BLOCK</span>
        </div>
        <div class="column is-3">
          <BlockNumber :value="block.number" />
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Time</span>
        </div>
        <div class="column is-3">
          <TimeStamp :value="block.timestamp" />
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">HASH</span>
        </div>
        <div class="column is-3">
          <Hash :value="block.hash" />
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Parent</span>
        </div>
        <div class="column is-3">
          <BlockHash :number="block.number - 1" :value="block.parentHash" />
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
          {{ block.nonce }}
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Size</span>
        </div>
        <div class="column is-3">
          {{ block.size }}
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">Transactions</span>
        </div>
        <div class="column is-5">
          <span>
          {{ block.transactions == null ? 0 : block.transactions.length }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <div class="columns is-mobile">
        <div class="column is-2 has-text-right">
          <span class="heading is-1 has-text-right">ERC20 Transfers</span>
        </div>
        <div class="column is-5">
          <span>
           <ERC20Transfers  v-bind:block="block" />
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12">
      <b-table :data="transactions" default-sort="transactionIndex" default-sort-direction="asc" :per-page="20" :paginated="true" :pagination-simple="true">
        <template slot-scope="props">
                <b-table-column field="transactionIndex" label="ID" sortable numeric>
                    {{ props.row.transactionIndex }}
                </b-table-column>
                <b-table-column field="hash" label="HASH" sortable>
                <TransactionLink :transaction="props.row.hash" />
                </b-table-column>
                <b-table-column field="from" label="FROM" sortable>
                    <AddressLink :address="props.row.from" />
                </b-table-column>
                <b-table-column field="to" label="TO" sortable>
                    <AddressLink :address="props.row.to" />
                </b-table-column>
                <b-table-column field="value_eth" label="VALUE" sortable>
                    {{ props.row.value_eth }}
                </b-table-column>
        </template>
        <template slot="empty">
               <section class="section">
                   <div class="content has-text-grey has-text-centered">
                       <p>
                           <b-icon
                               icon="emoticon-sad"
                               size="is-large">
                           </b-icon>
                       </p>
                       <p>No transaction to show.</p>
                   </div>
               </section>
           </template>
      </b-table>
    </div>
  </div>
</div>
</template>


<script>
import Vue from 'vue';

import Hash from '@/components/ui/Hash.vue';
import BlockHash from '@/components/ui/BlockHash.vue';
import BlockNumber from '@/components/ui/BlockNumber.vue';
import AddressLink from '@/components/ui/AddressLink.vue';
import TransactionLink from '@/components/ui/TransactionLink.vue';
import TimeStamp from '@/components/ui/TimeStamp.vue';

import ERC20Transfers from '@/components/plugins/ERC20Transfers.vue';

export default {
  name: 'BlockContent',
  props: {
    currentBlock: Number,
  },
  components: {
    AddressLink, TransactionLink, Hash, BlockHash, BlockNumber, TimeStamp, ERC20Transfers,
  },
  data() {
    return ({
      block: {},
      transactions: [],
      transactions_uid: '',
    });
  },
  watch: {
    async currentBlock() {
      if (this.currentBlock != -1) {
        const context = this;

        // We save a UUID to prevent old callbacks from also giving their results
        context.transactions_uid = this.lib_UID();
        const uid = context.transactions_uid;

        // We get the block to iterate all his transactions
        context.lib_getBlock(context.currentBlock, (err, block) => {
        console.log(block)
          context.block = block;
          const currentBlock = context.currentBlock;
          context.transactions = [];

          // For every individual transaction we fill the table.
          for (let i = 0; i < context.block.transactions.length; i++) {
            context.lib_getTransaction(context.block.transactions[i], true, (err, tx) => {
              if (tx != null && uid == context.transactions_uid) {
                context.transactions.push(tx);
              }
            });
          }
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
