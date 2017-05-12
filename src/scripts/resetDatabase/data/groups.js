const MongoUtil = require('util-mongodb').default;

function getGroup(name, weight) {
  return {
    id: MongoUtil.generateId(),
    name,
    weight,
    status: true,
    created: Date(),
  }
}

module.exports = function() {
  return [getGroup('A', 1), getGroup('B', 2)];
}
