/* eslint max-len: [2, 500, 4] */

const MongoUtil = require('util-mongodb').default;

const school = require('./data/school');
const config = require('../../config');

const mongoUtil = new MongoUtil(config.get('db.url'));

mongoUtil
  .openConnection()
  .then(() => mongoUtil.dropCollection('school'))
  .then(() => mongoUtil.insert('school', school))
  .then(() => {
    console.log('finish');
    mongoUtil.closeConnection();
  })
  .catch(errors => {
    console.log('Error', errors);
  });
