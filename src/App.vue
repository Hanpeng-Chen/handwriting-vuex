<template>
  <div id="app">
    <ul>
      <li>数量：{{$store.state.count}}</li>
      <li>count+1：{{$store.getters.count}}</li>
      <li>count+1：{{$store.getters.count}}</li>
      <button @click="$store.state.count++">加1</button>
      <button @click="$store.commit('addCount', 10)">加10</button>
      <button @click="$store.dispatch('addCount', 10)">异步加10</button>
    </ul>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
