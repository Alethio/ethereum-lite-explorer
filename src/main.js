import Vue from 'vue';
import Buefy from 'buefy';
import uuidv1 from 'uuid/v1';
import VTooltip from 'v-tooltip';
import VueTimeago from 'vue-timeago';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Buefy is a collection of BulmaCSS components for VueJS: https://buefy.github.io/#/documentation/start
Vue.use(Buefy);

// VTooltip helps us display tooltips easily: https://github.com/Akryum/v-tooltip
Vue.use(VTooltip);

// Timeago is used to handle timestamp display
Vue.use(VueTimeago, { name: 'Timeago', locale: 'en' });

/*
 * We define here global functions that are accessible by any instance of Vue
 * This is the core utils of the project
 */
Vue.mixin({
  methods: {
    lib_goHome() {
      this.$router.push({
        path: '/',
      });
    },
    /*
     * Navigate to a block information page
     */
    lib_goToBlock(blockNumber) {
      this.$router.push({
        path: `/block/${blockNumber}`,
      });
    },
    /*
     * Navigate to an account information page
     */
    lib_goToAccount(address) {
      this.$router.push({
        path: `/account/${address}`,
      });
    },
    /*
     * Navigate to tx information page
     */
    lib_goToTx(hash) {
      this.$router.push({
        path: `/tx/${hash}`,
      });
    },
    /*
     ** Get a block either from RPC, cache.
     */
    lib_getBlock(blockNumber, callback) {
      const context = this;
      if (blockNumber < 0) {
        callback(null, null);
      } else if (this.$store.state.blocks[blockNumber] == null) {
        this.$store.commit('setPending', blockNumber);
        // debugger;
        this.$store.state.w3.eth.getBlock(`${blockNumber}`, true, (err, blk) => {
          const block = blk;
          if (block != null) {
            context.$store.commit('setLastBlock', block.number);
            for (let i = 0; i < block.transactions.length; i += 1) {
              context.$store.commit('storeTransaction', context.lib_processTX(block.transactions[i]));
              block.transactions[i] = block.transactions[i].hash;
            }
            context.$store.commit('storeBlock', block);
          }
          context.$store.commit('removePending', blockNumber);
          callback(null, block);
        });
      } else if (this.$store.state.pendingQueries[blockNumber]) {
        setTimeout(() => {
          context.lib_getBlock(blockNumber, callback);
        }, 500);
      } else {
        // console.log('We already have the block');
        callback(null, this.$store.state.blocks[blockNumber]);
      }
    },
    /*
     ** Get a transaction either from RPC, cache.
     */
    lib_getTransaction(transactionHash, withReceipt, callback) {
      const getReceipt = withReceipt || false;
      const context = this;
      //  console.log('Get transaction', transactionHash, withreceipt)
      if (context.$store.state.transactions[transactionHash] == null) {
        context.$store.commit('setPending', transactionHash);
        context.$store.state.w3.eth.getTransaction(transactionHash, (err, tx) => {
          const transaction = tx;
          if (err || transaction == null) {
            callback(true, null);
            context.$store.commit('removePending', transactionHash);
          } else if (getReceipt) {
            context.$store.state.w3.eth.getTransactionReceipt(transactionHash, (rerr, receipt) => {
              transaction.receipt = receipt;
              context.$store.commit('storeTransaction', context.lib_processTX(transaction));
              context.$store.commit('removePending', transactionHash);
              callback(null, transaction);
            });
          } else {
            context.$store.commit('storeTransaction', context.lib_processTX(transaction));
            context.$store.commit('removePending', transactionHash);
            callback(null, transaction);
          }
        });
      } else if (!this.$store.state.pendingQueries[transactionHash]) {
        // console.log('We already have the tx');
        const tx = this.$store.state.transactions[transactionHash];
        if (tx.receipt == null && getReceipt) {
          this.$store.commit('setPending', transactionHash);
          this.$store.state.w3.eth.getTransactionReceipt(transactionHash, (err, receipt) => {
            tx.receipt = receipt;
            context.$store.commit('storeTransaction', context.lib_processTX(tx));
            context.$store.commit('removePending', transactionHash);
            callback(null, tx);
          });
        } else {
          callback(null, tx);
        }
      } else {
        setTimeout(() => {
          context.lib_getTransaction(transactionHash, getReceipt, callback);
        }, 500);
      }
    },
    /*
     **
     */
    lib_getAccount(address, callback) {
      const context = this;
      this.$store.state.w3.eth.getBalance(address, (err, balance) => {
        if (err) {
          callback(err, null);
        } else {
          context.$store.state.w3.eth.getCode(address, (cerr, code) => {
            if (cerr) {
              callback(cerr, null);
            } else {
              callback(null, {
                balance,
                balance_eth: parseFloat(context.$store.state.w3.fromWei(balance)),
                code,
                isContract: (code !== '0x'),
              });
            }
          });
        }
      });
    },
    /*
     ** Internal function to enrich/decode any field of a transaction so render don't have to.
     */
    lib_processTX(tx) {
      const transaction = tx;
      transaction.value_eth = parseFloat(this.$store.state.w3.fromWei(transaction.value));
      if (transaction.receipt != null) {
        transaction.gas_used_percent = (transaction.receipt.gasUsed * 100) / transaction.gas;
      }
      return (transaction);
    },
    /*
     ** Return a uique ID that is convenient for preventing callbacks to write after
     ** the state has changed
     */
    lib_UID() {
      return (uuidv1());
    },
    lib_monitorLastBlock() {
      const context = this;
      this.$store.state.w3.eth.getBlockNumber((err, number) => {
        if (!err) {
          context.$store.commit('setLastBlock', number);
          this.$store.state.w3.eth.getBlock(number, false, (berr, block) => {
            if (!berr) {
              context.$store.commit('setLastBlockFull', block);
            }
          });
        }
        this.$store.state.w3.net.getPeerCount((perr, count) => {
          if (!perr) {
            context.$store.commit('setPeers', count);
          }
        });
        this.$store.state.w3.version.getNode((nerr, version) => {
          if (!nerr) {
            context.$store.commit('setNodeType', version);
          }
        });
        setTimeout(context.lib_monitorLastBlock, 6000);
      });
    },
    lib_guessInputType(inputType) {
      if (inputType == null) {
        return ({ type: 'none', value: inputType });
      }
      let input = inputType.replace(/0[xX][^A-Z0-9]+/ig, '');
      input = input.toLowerCase();
      if (`${parseInt(input, 10)}` === input && !input.startsWith('0x')) {
        return ({ type: 'block', value: parseInt(input, 10) });
      }
      if (!input.startsWith('0x')) {
        input = `0x${input}`;
      }
      const re = /[0-9A-Fa-f]/g;
      if (re.test(input)) {
        if (input.length === 42) {
          return ({ type: 'account', value: input });
        } else if (input.length === 66) {
          return ({ type: 'bkOrTx', value: input });
        }
        return ({ type: 'none', value: input });
      }


      return ({ type: 'none', value: input });
    },
    lib_processSearch(input) {
      const inputType = this.lib_guessInputType(input);
      // console.log(inputType)
      if (inputType.type === 'bkOrTx') {
        this.$store.state.w3.eth.getBlock(inputType.value, false, (err, result) => {
          if (!err) {
            if (result && result.number) {
              this.lib_goToBlock(result.number);
            } else {
              this.lib_goToTx(inputType.value);
            }
          }
        });
      } else if (inputType.type === 'block') {
        this.lib_goToBlock(inputType.value);
      } else if (inputType.type === 'account') {
        this.lib_goToAccount(inputType.value);
      } else {
        this.$router.push({
          path: '/404',
        });
      }
    },
    lib_openSearch() {
      this.$dialog.prompt({
        message: 'Enter a block number, transaction hash or address.',
        inputAttrs: {
          placeholder: 'e.g. 0x45434...',
          maxlength: 100,
        },
        confirmText: 'Search',
        onConfirm: value => this.lib_processSearch(value),
      });
    },
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
