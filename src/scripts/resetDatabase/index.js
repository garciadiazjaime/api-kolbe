const MongoUtil = require('util-mongodb').default;
const _ = require('lodash');
const config = require('../../config');

const mongoUtil = new MongoUtil(config.get('db.url'));
const collections = ['location', 'activity', 'document', 'grade', 'group', 'level', 'newsletter', 'parent', 'student'];
const locations = require('./data/locations');
const levels = require('./data/levels');
const grades = require('./data/grades');

mongoUtil
  .openConnection()
  .then(() => {
    console.log('DB open');
    return collections.map((item) => {
      return mongoUtil.dropCollection(item);
    });
  })
  .then((promises) => {
    console.log('collections dropped');
    return Promise.all(promises)
  })
  .then(() => {
    return locations.map((item) => {
      const document = _.assign({}, item, {
        status: true,
        created: Date(),
      });
      return mongoUtil.insert('location', document);
    });
  })
  .then((promises) => {
    console.log('locations created');
    return Promise.all(promises)
  })
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
      });
    });
    return promises;
  })
  .then((promises) => {
    console.log('levels created');
    return Promise.all(promises)
  })
  .then((data) => {
    const promises = [];
    data.map((results, levelIndex) => {
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
      });
    });
    return promises;
  })
  .then((promises) => {
    console.log('grades created');
    return Promise.all(promises)
  })
  .then((data) => {
    mongoUtil.closeConnection();
    process.exit(0);
  });


  // () => {
  //   console.log('Error :: No DB connection open');
  // }
