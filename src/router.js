import Vue from 'vue';
import Router from 'vue-router';

import Account from './views/Account.vue';
import Block from './views/Block.vue';
import Home from './views/Home.vue';
import Tx from './views/Tx.vue';
import noFound from './views/404.vue';


Vue.use(Router);
const routerMode = process.env.VUE_APP_ROUTER_MODE || 'hash';

export default new Router({
  base: process.env.VUE_APP_BASE_URL,
  mode: routerMode,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/account/:address',
      name: 'account',
      component: Account,
    },
    {
      path: '/block/:blocknumber',
      name: 'block',
      component: Block,
    },
    {
      path: '/tx/:hash',
      name: 'tx',
      component: Tx,
    },
    {
      path: '/404',
      name: 'NotFound',
      component: noFound,
    },
  ],
});
