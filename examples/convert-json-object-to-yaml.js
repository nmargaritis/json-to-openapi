const { ObjectCorverter } = require('../index');

let jsonExample = {
  "total_users": 29088,
  "total_credits": "84887.66",
  "total_casino_credits": "8576.04",
  "total_bonus_credits": "830.48",
  "hello": {
      one: null
  },
  "hello2": [1, {'abc': 'dbc'}, 3]
};

const converter = new ObjectCorverter(jsonExample);
console.log(converter.process());


