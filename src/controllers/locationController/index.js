import MongoUtil from 'util-mongodb';
import _ from 'lodash';

export default class LocationController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'location';
  }

  list() {
    const filter = {
      status: true,
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

  get(locationId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(locationId),
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
    const newData = _.assign({}, data, {
      created: new Date(),
      status: true,
    });
    return new Promise((resolve, reject) => {
      this.mongoUtil
        .insert(this.collectionName, newData)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  }

  update(locationId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(locationId),
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

  delete(locationId) {
    return new Promise((resolve, reject) => {
      const filter = {
        _id: this.mongoUtil.getObjectID(locationId),
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
