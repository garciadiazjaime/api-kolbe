const grades = require('./grades');
const MongoUtil = require('util-mongodb').default;

function getLevel(name, weight) {
  return {
    id: MongoUtil.generateId(),
    name,
    weight,
    status: true,
    created: Date(),
    grade: grades(name.toUpperCase()),
  };
}

module.exports = (location) => {
  switch (location.toUpperCase()) {
    case 'SANTA_FE':
      return [getLevel('Preescolar', 1),
      getLevel('Primaria', 2),
      getLevel('Secundaria', 3),
      getLevel('Preparatoria')];
    default:
      return [getLevel('Preescolar', 1),
      getLevel('Primaria', 2),
      getLevel('Secundaria', 3)];
  }
};
