import { Vue } from "./install";
import ModuleCollection from "./module/module-collection";
import { forEach } from "./util";

function installModule(store, rootState, path, module) {
  if (path.length > 0) {
    let parent = path.slice(0, -1).reduce((meno, current) => {
      return memo[current];
    }, rootState);
    Vue.set(parent, path[path.length - 1], module.state);
  }

  module.forEachGetter((fn, key) => {
    store.wrapperGetters[key] = function() {
      return fn.call(store, module.state);
    };
  });
  module.forEachMutation((fn, key) => {
    store.mutations[key] = store.mutations[key] || [];
    store.mutations[key].push((payload) => {
      return fn.call(store, module.state, payload);
    });
  });
  module.forEachAction((fn, key) => {
    store.actions[key] = store.actions[key] || [];
    store.actions[key].push((payload) => {
      return fn.call(store, store, payload);
    });
  });
  module.forEachChild((child, key) => {
    installModule(store, path.concat(key), child);
  });
}

class Store {
  constructor(options) {
    // 对用户的模块进行整合
    this._modules = new ModuleCollection(options);

    // 将模块中的所有getters  actions  mutations进行收集
    this.wrapperGetters = {};
    this.getters = {};
    this.mutations = {};
    this.actions = {};

    const computed = {};

    // 如果没有namesapce，getters都放在根上，mutations和actions合并到数组中
    let state = options.state
    installModule(this, state, [], this._modules.root);

    forEach(this.wrapperGetters, (getter, key) => {
      return computed[key]= getter
      Object.defineProperty(this.getters, key, {
        get: ()=> this._vm[key]
      })
    })

    // 这个状态在页面渲染时需要收集对应的渲染watcher，这样状态更新才会更新视图
    this._vm = new Vue({
      data: {
        $$state: state, // $符号开头的数据不会被挂载到实例上，但是会挂载到当前的_data上，减少了一次代理
      },
      computed,
    });
  }
  // 类属性访问器
  get state() {
    // 依赖于Vue的响应式原理
    return this._vm._data.$$state;
  }
  commit = (type, payload) => {
    this.mutations[type] && this.mutations[type].forEach((fn) => fn(payload));
  };
  dispatch = (type, payload) => {
    this.actions[type] && this.actions[type].forEach((fn) => fn(payload));
  };
}

export default Store;
