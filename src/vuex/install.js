export let Vue;
function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      // this代表的是每个组件实例
      // 获取根组件上的store，共享给每个组件
      let options = this.$options;
      if (options.store) {
        // 根
        this.$store = options.store;
      } else {
        // 先保证是个子组件，并且父组件上有$store
        if (this.$parent && this.$parent.$store) {
          this.$store = this.$parent.$store;
        }
      }
    },
  });
}

export default install;
