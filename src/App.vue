<template>
<div id="app" class="is-fullheight">
  <div class="columns top-menu">
    <div class="column">
      <router-link :to="{ name: 'home'}" class=" top-menu-item">
        SOME BRANDING?
      </router-link>
    </div>

    <div class="column has-text-right top-menu-item ">
    <p  v-on:click="lib_openSearch()" class="top-menu-item-link button" style="margin-right:5px;">
      Search
    </p>
      <p  v-on:click="lib_goToBlock(lastBlock)" class="top-menu-item-link button">
        Best block: {{ lastBlock }}
      </p>
    </div>
  </div>
  <router-view/>
</div>
</template>

<style>
html,
body {
  height: 100%;
}

.is-fullheight {
  height: 100%;
}

.sidebar {
  min-height: 100%;
  background-color: rgb(255, 255, 255);
  border-right: 1px solid rgb(208, 222, 242);
}

.content {
  min-height: 100%;
  background-color: rgb(247, 248, 250);
}

.tooltip-inner {
  background: #FFF;
  color: black;
  padding: 4px;
  border-radius: 1px;
  border-color: rgb(208, 222, 242);
  border-style: solid;
  border-width: 1px;
}

.top-menu {
  background-color: #151D36;
  margin: 0px;
}

.top-menu-item {
  color: #FFFFFF;
  padding: 4px;
}

.top-menu-item-link {
  cursor: pointer;
}
</style>

<script>
export default {

  mounted() {
    // We start here the watcher for last blocks
    this.lib_monitorLastBlock();
  },
  computed: {
    lastBlock() {
      return (this.$store.state.lastBlock);
    },
  },

};
</script>
