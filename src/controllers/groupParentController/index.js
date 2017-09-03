/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import UserController from '../userController';
import StudentController from '../studentController';

export default class GroupParentController {

  constructor() {
    this.collectionName = 'groupParent';
    this.mongoUtil = new MongoUtil();
    this.userController = new UserController();
    this.studentController = new StudentController();
  }

  list(groupId) {
    return this.studentController
      .list(groupId)
      .then(students => Promise.all(students.map(student => this.userController.get(student.parentId))));
  }

  save(groupId, parentId) {
    if (!groupId || !parentId) {
      return null;
    }
    const newData = _.assign({}, {
      status: true,
      created: new Date(),
      groupId: this.mongoUtil.getObjectID(groupId),
      parentId,
    });
    return this.mongoUtil.insert(this.collectionName, newData);
  }

  delete(groupId, parentId) {
    const filter = {
      groupId: this.mongoUtil.getObjectID(groupId),
      parentId: this.mongoUtil.getObjectID(parentId),
      status: true,
    };
    const newData = _.assign({}, {
      deleted: new Date(),
      status: false,
    });
    return this.mongoUtil.update(this.collectionName, newData, filter)
      .then(() => this.isParentActive(parentId))
      .then(results => this.disableParent(results, parentId));
  }

  isParentActive(parentId) {
    const filter = {
      parentId: this.mongoUtil.getObjectID(parentId),
      status: true,
    };
    return this.mongoUtil.find(this.collectionName, filter);
  }

  disableParent(results, parentId) {
    if (!results) {
      return this.userController.delete(parentId);
    }
    return null;
  }

}
