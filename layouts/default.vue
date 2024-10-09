<template>
  <div id="app">
    <nav-bar />
    <nuxt />
  </div>
</template>

<script>
import navBar from '../components/navBar.vue';

export default {
  components: {
    navBar,
  },
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: blue;
}
</style>
