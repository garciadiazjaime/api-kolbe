/* eslint new-cap: ["error", { "capIsNew": false }] */
const levels = require('./levels');
const mongoose = require('mongoose');

module.exports = [{
  id: mongoose.Types.ObjectId(),
  name: 'Santa Fé',
  code: 'santa_fe',
  weight: 1,
  status: true,
  created: Date(),
  level: levels('SANTA_FE'),
}, {
  id: mongoose.Types.ObjectId(),
  name: 'Otay',
  code: 'otay',
  weight: 2,
  status: true,
  created: Date(),
  level: levels('OTAY'),
}, {
  id: mongoose.Types.ObjectId(),
  name: 'Presidentes',
  code: 'presidentes',
  weight: 3,
  status: true,
  created: Date(),
  level: levels('PRESIDENTES'),
}];
