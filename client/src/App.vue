<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Programs</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './assets/css/main.scss';

  #nav {
    margin: 15px 0;
  }
</style>
