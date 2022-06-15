const TypeHelper = require('./typeHelper');

class OpenApiBuilder {
  constructor() {
    this.arrayHandlers = {
      string: this.processPrimitiveArray,
      integer: this.processPrimitiveArray,
      number: this.processPrimitiveArray,
      boolean: this.processPrimitiveArray,
      object: this.processObjectArray,
      array: this.processArraysArray
    };
  }

  createObject(parent) {
    // three head (top level node) does not have a parent
    if (typeof this.target === 'undefined') {
      this.target = parent;
    }

    parent.type = 'object';
    parent.properties = {};
    return parent.properties;
  }

  createArray(parent) {
    // three head (top level node) does not have a parent
    if (typeof this.target === 'undefined') {
      this.target = parent;
    }

    parent.type = 'array';
    parent.items = {};
    return parent.items;
  }

  processObjectArray(jsonArray, parent, type, callback) {
    callback(jsonArray[0], parent);
  }

  processPrimitiveArray(jsonArray, parent, type) {
    parent.type = type;
  }

  getValue() {
    return this.target;
  }

  build(parent, key, value, objectType) {
    parent[key] = {};
    parent[key].type = objectType;
    this.addExample(parent[key], objectType, value);
    return parent[key];
  }

  addExample(part, type, value) {
    if (type !== 'object' && type !== 'array') {
      part.example = value;
    }
  }

  nextValue(index) {
    return index + 1;
  }

  identifyArrayTypes(jsonArray) {
    let equal = true;
    let lastCheckedType;

    for (let index = 0; index < jsonArray.length; index++) {
      lastCheckedType = TypeHelper.detectType(jsonArray[index]);
      if (this.nextValue(index) < jsonArray.length) {
        let nextTypeToCheck = TypeHelper.detectType(jsonArray[this.nextValue(index)]);
        let equalTypes = lastCheckedType === nextTypeToCheck;

        if (!equalTypes) {
          equal = false;
          lastCheckedType = null;
          break;
        }
      }
    }

    return {
      equal: equal,
      objectType: lastCheckedType
    };
  }
}

module.exports = OpenApiBuilder;
