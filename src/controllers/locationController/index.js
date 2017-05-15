/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
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
    return this.mongoUtil.find(this.collectionName, filter, options);
  }

  get(locationId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(locationId),
      status: true,
    };
    return this.mongoUtil.findOne(this.collectionName, filter);
  }

  save(data) {
    const newData = _.assign({}, data, {
      created: new Date(),
      status: true,
    });
    return this.mongoUtil.insert(this.collectionName, newData);
  }

  update(locationId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(locationId),
    };
    const newData = _.assign({}, data, {
      updated: new Date(),
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }

  delete(locationId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(locationId),
    };
    const newData = _.assign({}, {
      deleted: new Date(),
      status: false,
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }

}
