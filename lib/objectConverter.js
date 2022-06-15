const OpenApiBuilder = require('./objectBuilder');
const YAML = require('json2yaml');
const TypeHelper = require('./typeHelper');

class ObjectCorverter {
  constructor(json) {
    this.json = json;
    this.builder = new OpenApiBuilder();
  }

  process() {
    if (Array.isArray(this.json)) {
      this.processArray(this.json, {});
    } else if (typeof this.json === 'object') {
      this.processObject(this.json, {});
    }
    return YAML.stringify(this.builder.getValue());
  }

  processObject(jsonPart, parent) {
    var props = this.builder.createObject(parent);
    for (let key in jsonPart) {
      this.processObjectProperty(props, key, jsonPart[key]);
    }
  }

  processObjectProperty(parent, key, value) {
    let objectType = TypeHelper.detectType(value);
    let openApiValue = this.builder.build(parent, key, value, objectType);
    if (objectType === 'object') {
      this.processObject(value, openApiValue);
    } else if (objectType === 'array') {
      this.processArray(value, openApiValue);
    }
  }

  processArray(jsonArray, parent) {
    var props = this.builder.createArray(parent);
    let typeProperties = this.builder.identifyArrayTypes(jsonArray);
    if (
      typeProperties.equal === true &&
      typeProperties.objectType !== 'array' &&
      typeof typeProperties.objectType !== 'undefined'
    ) {
      if (typeProperties.objectType !== 'object') {
        parent.example = [jsonArray[0]];
      }
      this.builder.arrayHandlers[typeProperties.objectType].call(
        this,
        jsonArray,
        props,
        typeProperties.objectType,
        this.processObject.bind(this)
      );
    }
  }
}

module.exports = ObjectCorverter;
