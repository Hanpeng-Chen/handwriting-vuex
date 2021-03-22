import { Vue } from "./install";
import { forEach } from "./util";

class Store {
  constructor(options) {
    let { state, getters, mutations, actions, module, strict } = options;

    this.getters = {}; // 取getters属性的时候，将其代理到计算属性上

    const computed = {};

    forEach(getters, (fn, key) => {
      computed[key] = () => {
        return fn(this.state);
      };

      // 当去getters上取值的时候，需要对computed取值
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key], // 具备了缓存的功能
      });
    });

    // Object.keys(getters).forEach(key => {
    //   computed[key] = ()=> {
    //     return getters[key](this.state) // 保证参数是state
    //   }

    //   // 当去getters上取值的时候，需要对computed取值
    //   Object.defineProperty(this.getters, key, {
    //     get: ()=> this._vm[key] // 具备了缓存的功能
    //   })
    // })

    this.mutations = {};
    forEach(mutations, (fn, key) => {
      this.mutations[key] = (payload) => fn.call(this, this.state, payload);
    });

    this.actions = {};
    forEach(actions, (fn, key) => {
      this.actions[key] = (payload) => fn.call(this, this, payload);
    });

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
    this.mutations[type](payload);
  }
  dispatch = (type, payload) => {
    this.actions[type](payload);
  }
}

export default Store;
