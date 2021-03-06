/* eslint new-cap: ["error", { "capIsNew": false }] */

const groups = require('./groups');
const mongoose = require('mongoose');

function getGrade(name, weight) {
  return {
    id: mongoose.Types.ObjectId(),
    name,
    weight,
    status: true,
    created: Date(),
    group: groups(),
  };
}

module.exports = (level) => {
  switch (level) {
    case 'PREESCOLAR':
    case 'SECUNDARIA':
      return [getGrade('1ro', 1),
      getGrade('2do', 2),
      getGrade('3ro', 3)];
    default:
      return [getGrade('1ro', 1),
      getGrade('2do', 2),
      getGrade('3ro', 3),
      getGrade('4to', 4),
      getGrade('5to', 5),
      getGrade('6to', 6)];
  }
};
