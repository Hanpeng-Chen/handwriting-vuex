import Vue from "vue";
// import Vuex from "vuex";
import Vuex from '@/vuex/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    count(state) {
      console.log('getters count')
      return state.count + 1
    }
  },
  mutations: {
    addCount(state, payload) {
      state.count += payload
    }
  },
  actions: {
    addCount({commit}, payload) {
      setTimeout(()=> {
        commit('addCount', payload)
      }, 1000)
    }
  },
  modules: {},
  strict: true
});
