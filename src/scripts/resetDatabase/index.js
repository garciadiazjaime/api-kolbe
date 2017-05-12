/* eslint max-len: [2, 500, 4] */

const MongoUtil = require('util-mongodb').default;
const _ = require('lodash');
const config = require('../../config');

const mongoUtil = new MongoUtil(config.get('db.url'));
const collections = ['location', 'activity', 'document', 'grade', 'group', 'level', 'newsletter', 'parent', 'student'];
const locations = require('./data/locations');
const levels = require('./data/levels');
const grades = require('./data/grades');
const groups = require('./data/groups');

mongoUtil
  .openConnection()
  .then(() => collections.map(item => mongoUtil.dropCollection(item)))
  .then(promises => Promise.all(promises))
  .then(() => locations.map(item => {
    const document = _.assign({}, item, {
      status: true,
      created: Date(),
    });
    return mongoUtil.insert('location', document);
  }))
  .then(promises => Promise.all(promises))
  .then((data) => {
    const promises = [];
    data.map((results, locationIndex) => {
      const parentId = results.data.insertedIds.pop();
      levels.map((item, levelIndex) => {
        if ((locationIndex === 0) || (locationIndex > 0 && levelIndex < 3)) {
          const document = _.assign({}, item, {
            parentId: parentId.toString(),
            status: true,
            created: Date(),
          });
          promises.push(mongoUtil.insert('level', document));
        }
        return null;
      });
      return null;
    });
    return promises;
  })
  .then(promises => Promise.all(promises))
  .then((data) => {
    const promises = [];
    data.map((results) => {
      const level = results.data.ops.pop().name;
      const parentId = results.data.insertedIds.pop();
      grades.map((item, gradeIndex) => {
        if (['primaria', 'preparatoria'].indexOf(level.toLowerCase()) !== -1 || gradeIndex < 3) {
          const document = _.assign({}, item, {
            parentId: parentId.toString(),
            status: true,
            created: Date(),
          });
          promises.push(mongoUtil.insert('grade', document));
        }
        return null;
      });
      return null;
    });
    return promises;
  })
  .then(promises => Promise.all(promises))
  .then((data) => {
    const promises = [];
    data.map((results) => {
      const parentId = results.data.insertedIds.pop();
      groups.map((item) => {
        const document = _.assign({}, item, {
          parentId: parentId.toString(),
          status: true,
          created: Date(),
        });
        promises.push(mongoUtil.insert('class', document));
        return null;
      });
      return null;
    });
    return promises;
  })
  .then(promises => Promise.all(promises))
  .then(() => {
    console.log('==== Done');
    mongoUtil.closeConnection();
    process.exit(0);
  })
  .catch(errors => {
    console.log('Error', errors);
  });
