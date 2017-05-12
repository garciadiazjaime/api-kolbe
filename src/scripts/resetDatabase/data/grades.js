const groups = require('./groups');
const MongoUtil = require('util-mongodb').default;

function getGrade(name, weight) {
  return {
    id: MongoUtil.generateId(),
    name,
    weight,
    status: true,
    created: Date(),
    group: groups(),
  }
}

module.exports = function(level) {
  switch (level) {
    case 'PREESCOLAR':
    case 'SECUNDARIA':
      return [getGrade('1ro', 1), getGrade('2do', 2), getGrade('3ro', 3)];
    default:
      return [getGrade('1ro', 1), getGrade('2do', 2), getGrade('3ro', 3), getGrade('4to', 4), getGrade('5to', 5), getGrade('6to', 6)];
  }
}
