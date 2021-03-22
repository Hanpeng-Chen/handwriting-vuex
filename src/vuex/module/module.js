import { forEach } from "../util";

class Module {
  constructor(rawModule) {
    this._raw = rawModule;
    this._children = {};
    this.state = rawModule.state;
  }
  getChild (childName) {
    this._children[childName];
  }
  addChild (childName, module) {
    this._children[childName] = module;
  }
  forEachGetter (cb) {
    this._raw.getters && forEach(this._raw.getters, cb);
  }
  forEachMutation (cb) {
    this._raw.mutations && forEach(this._raw.mutations, cb);
  }
  forEachAction (cb) {
    this._raw.actions && forEach(this._raw.actions, cb);
  }
  forEachChild (cb) {
    this._children && forEach(this._children, cb);
  }
}

export default Module;
