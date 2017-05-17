import MongoUtil from 'util-mongodb';
import _ from 'lodash';

export default class GroupStudentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'groupStudent';
  }

  list(groupId) {
    const filter = {
      status: true,
      groupId,
    };
    const options = {
      sort: 'weight',
    };
    return new Promise((resolve, reject) => {
      this.mongoUtil.find(this.collectionName, filter, options)
          .then(results => resolve(results))
          .catch(err => reject(err));
    });
  }

  save(groupId, studentId) {
    if (!groupId || !studentId) {
      return null;
    }
    const newData = _.assign({}, {
      status: true,
      created: new Date(),
      groupId,
      studentId,
    });
    return this.mongoUtil.insert(this.collectionName, newData);
  }

  upload(groupId, studentId) {
    const filter = {
      groupId,
      studentId,
    };
    return this.mongoUtil.findOne(this.collectionName, filter)
      .then(results => this.upsert(results, groupId, studentId));
  }

  upsert(entity, groupId, studentId) {
    return !entity ? this.save(groupId, studentId) : entity;
  }
}
