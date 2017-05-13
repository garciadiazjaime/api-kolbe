import MongoUtil from 'util-mongodb';
import _ from 'lodash';

export default class StudentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'student';
  }

  list(groupId) {
    const filter = {
      status: true,
      group: { $in: [groupId] },
    };
    return new Promise((resolve, reject) => {
      this.mongoUtil.find('student', filter, {})
          .then(results => resolve(results))
          .catch(err => reject(err));
    });
  }

  get(identityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
      status: true,
    };
    return new Promise((resolve, reject) => {
      this.mongoUtil
        .findOne(this.collectionName, filter)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  }

  save(parentId, data) {
    const newData = _.assign({}, data, {
      status: true,
      created: new Date(),
      group: [parentId],
    });
    return new Promise((resolve, reject) => {
      this.mongoUtil
        .insert(this.collectionName, newData)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  }

  update(identityId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, data, {
      updated: new Date(),
    });
    return new Promise((resolve, reject) => {
      this.mongoUtil
        .update(this.collectionName, newData, filter)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  }

  delete(identityId) {
    return new Promise((resolve, reject) => {
      const filter = {
        _id: this.mongoUtil.getObjectID(identityId),
      };
      const newData = _.assign({}, {
        deleted: new Date(),
        status: false,
      });
      this.mongoUtil
        .update(this.collectionName, newData, filter)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  }
}
