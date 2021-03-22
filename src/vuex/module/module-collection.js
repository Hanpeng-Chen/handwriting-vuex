import { forEach } from "../util";
import Module from "./module";

class ModuleCollection {
  constructor(options) {
    // 对数据进行格式化
    // this.root = null;
    this.register([], options);
  }
  register(path, rawModule) {
    let newModule = new Module(rawModule);
    if (path.length == 0) {
      this.root = newModule;
    } else {
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current);
      }, this.root);
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEach(rawModule.modules, (module, key) => {
        this.register(path.concat(key), module);
      });
    }
  }
}

export default ModuleCollection;
