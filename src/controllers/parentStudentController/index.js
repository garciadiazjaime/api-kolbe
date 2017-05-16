import MongoUtil from 'util-mongodb';
import _ from 'lodash';

export default class ParentStudentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'parentStudent';
  }

  save(parentId, studentId) {
    if (!parentId || !studentId) {
      return null;
    }
    const newData = _.assign({}, {
      status: true,
      created: new Date(),
      parentId,
      studentId,
    });
    return this.mongoUtil.insert(this.collectionName, newData);
  }

  upload(parentId, studentId) {
    const filter = {
      parentId,
      studentId,
    };
    return this.mongoUtil.findOne(this.collectionName, filter)
      .then(results => this.upsert(results, parentId, studentId));
  }

  upsert(entity, parentId, studentId) {
    return !entity ? this.save(parentId, studentId) : entity;
  }
}
