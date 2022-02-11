<template>
  <div id="app">
    <main>
      <commander-tab />
      <commander-tab />
    </main>
  </div>
</template>

<script>
import CommanderTab from './components/CommanderTab.vue'

export default {
  name: 'App',
  components: {
    CommanderTab
  },
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;

  @media screen and (max-width: 991.98px) {
    height: auto;
  }
}

#app main {
  display: grid;
  padding: .5rem;
  gap: .5rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 991.98px) {
    grid-template-columns: 1fr;
  }
}
</style>
