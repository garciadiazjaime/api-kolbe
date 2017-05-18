/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import GroupStudentController from '../groupStudentController';
import ParentStudentController from '../parentStudentController';

export default class ParentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'parent';
    this.groupStudentController = new GroupStudentController();
    this.parentStudentController = new ParentStudentController();
  }

  list(params) {
    const filter = {
      status: true,
    };
    if (params.groupId) {
      return this.groupStudentController.getStudents(params.groupId)
        .then(students => this.parentStudentController.getParentsFromStudents(students))
        .then(parents => Promise.all(
          parents.map(item => this.get(item.parentId))
        ));
    }
    return this.mongoUtil.find(this.collectionName, filter, {});
  }

  get(identityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
      status: true,
    };
    return this.mongoUtil
      .findOne(this.collectionName, filter);
  }

  save(data) {
    if (!data) {
      return null;
    }
    const newData = _.assign({}, data, {
      status: true,
      created: new Date(),
    });
    return this.mongoUtil.insert(this.collectionName, newData);
  }

  update(identityId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, data, {
      updated: new Date(),
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }

  delete(identityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, {
      deleted: new Date(),
      status: false,
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }

  upload(data) {
    return this.findByCode(data)
      .then(results => this.upsert(results, data))
      .then(results => this.extractId(results));
  }

  findByCode(data) {
    const filter = {
      code: data.code,
    };
    return this.mongoUtil.findOne(this.collectionName, filter);
  }

  upsert(entity, data) {
    return !entity ? this.save(data) : entity;
  }

  extractId(data) {
    return data._id ? data._id : data.data.insertedIds[0];
  }
}
