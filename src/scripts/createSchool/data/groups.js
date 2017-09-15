/* eslint new-cap: ["error", { "capIsNew": false }] */
const mongoose = require('mongoose');

function getGroup(name, weight) {
  return {
    id: mongoose.Types.ObjectId(),
    name,
    weight,
    status: true,
    created: Date(),
  };
}

module.exports = () => [getGroup('A', 1), getGroup('B', 2)];
