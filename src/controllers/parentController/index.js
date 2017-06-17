/* eslint max-len: [2, 500, 4] */
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
      return this.groupStudentController.list(params.groupId)
        .then(students => this.parentStudentController.getParentsFromStudents(students))
        .then(parents => {
          const filterParents = parents.filter((parent, index, self) => self.findIndex(item => item.parentId.toString() === parent.parentId.toString()) === index);
          return Promise.all(filterParents.map(item => this.get(item.parentId)));
        });
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
    return this.parentStudentController.get(identityId)
      .then(students => Promise.all([
        this.groupStudentController.deleteStudents(students),
        this.parentStudentController.delete(identityId),
        this.mongoUtil.update(this.collectionName, newData, filter),
      ]));
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
    if (entity) {
      const newData = _.assign({}, entity, data, {
        status: true,
        deleted: null,
      });
      return this.update(entity._id, newData);
    }
    return this.save(data);
  }

  extractId(data) {
    return data.filter ? data.filter._id : data.data.insertedIds[0];
  }
}
