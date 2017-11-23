/* eslint new-cap: ["error", { "capIsNew": false }] */
const grades = require('./grades');
const mongoose = require('mongoose');

function getLevel(name, weight) {
  return {
    id: mongoose.Types.ObjectId(),
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
