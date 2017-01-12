import MongoUtil from 'util-mongodb';
import _ from 'lodash';

export default class PeriodController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'period';
  }

  list(locationId) {
    const filter = {
      status: true,
      locationId,
    };
    return new Promise((resolve, reject) => {
      this.mongoUtil.find(this.collectionName, filter, {})
          .then(results => resolve(results))
          .catch(err => reject(err));
    });
  }

  get(periodId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(periodId),
      status: true,
    };
    return new Promise((resolve, reject) => {
      this.mongoUtil
        .findOne(this.collectionName, filter)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  }

  save(locationId, data) {
    const newData = _.assign({}, data, {
      locationId,
      status: true,
      created: new Date(),
    });
    return new Promise((resolve, reject) => {
      this.mongoUtil
        .insert(this.collectionName, newData)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  }

  update(periodId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(periodId),
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

  delete(periodId) {
    return new Promise((resolve, reject) => {
      const filter = {
        _id: this.mongoUtil.getObjectID(periodId),
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
