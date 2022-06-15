const _ = require('lodash');

class TypeHelper {
  isInt(n) {
    return Number.isInteger(n);
  }

  isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

  isString(s) {
    return _.isString(s)
  }

  isBoolean(b) {
    return _.isBoolean(b)
  }

  isArray(l) {
    return _.isArray(l);
  }

  isObject(o) {
    return _.isObject(o);
  }

  detectType(value) {
    if (this.isString(value)) {
      return 'string';
    } else if (this.isInt(value)) {
      return 'integer';
    } else if (this.isFloat(value)) {
      return 'number';
    } else if (this.isBoolean(value)) {
      return 'boolean';
    } else if (this.isArray(value)) {
      return 'array';
    } else if (this.isObject(value)) {
      return 'object';
    } else {
      return null;
    }
  }
}

// singleton
module.exports = new TypeHelper();
