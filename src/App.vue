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
    <ul>
      <p>moduleA</p>
      <li>moduleA数量：{{$store.state.moduleA.count}}</li>
      <li>count：{{$store.getters['moduleA/count']}}</li>
      <button @click="$store.commit('moduleA/addCount', 10)">moduleA加10</button>
      <button @click="$store.dispatch('moduleA/addCount', 10)">moduleA异步加10</button>
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
