import Vue from "vue";
// import Vuex from "vuex";
import Vuex from "@/vuex/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1,
  },
  getters: {
    count(state) {
      console.log("getters count");
      return state.count + 1;
    },
  },
  mutations: {
    addCount(state, payload) {
      state.count += payload;
    },
  },
  actions: {
    addCount({ commit }, payload) {
      setTimeout(() => {
        commit("addCount", payload);
      }, 1000);
    },
  },
  modules: {
    moduleA: {
      // namespaced能解决子模块和父模块的命名冲突问题，相当于增加了一个命名空间
      // 如果没有namespaced，默认getters都会被定义到父模块上, mutations会放到一起执行
      namespaced: true,
      state: {
        count: 100,
      },
      getters: {
        count(state) {
          return state.count;
        },
      },
      mutations: {
        addCount(state, payload) {
          state.count += payload;
        },
      },
      actions: {
        addCount({ commit }, payload) {
          setTimeout(() => {
            commit("addCount", payload);
          }, 1000);
        },
      },
    },
  },
  strict: true,
});
