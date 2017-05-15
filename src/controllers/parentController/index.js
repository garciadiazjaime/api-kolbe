/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

export default class ParentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'parent';
    this.parentStudentCollectionName = 'parentStudent';
  }

  list(params) {
    const filter = {
      status: true,
    };
    if (params.groupId) {
      filter.groupId = params.groupId;
    }
    return new Promise((resolve, reject) => {
      this.mongoUtil.find(this.collectionName, filter, {})
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
