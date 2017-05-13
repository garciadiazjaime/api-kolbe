const levels = require('./levels');
const MongoUtil = require('util-mongodb').default;

module.exports = [{
  id: MongoUtil.generateId(),
  name: 'Santa Fé',
  weight: 1,
  status: true,
  created: Date(),
  level: levels('SANTA_FE'),
}, {
  id: MongoUtil.generateId(),
  name: 'Otay',
  weight: 2,
  status: true,
  created: Date(),
  level: levels('OTAY'),
}, {
  id: MongoUtil.generateId(),
  name: 'Presidentes',
  weight: 3,
  status: true,
  created: Date(),
  level: levels('PRESIDENTES'),
}];
