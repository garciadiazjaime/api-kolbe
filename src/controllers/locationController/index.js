import MongoUtil from 'util-mongodb';
import _ from 'lodash';

export default class LocationController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'location';
  }

  getLocations() {
    const filter = {
      status: true,
    };
    return new Promise((resolve, reject) => {
      this.mongoUtil.find(this.collectionName, filter, {})
          .then(results => resolve(results))
          .catch(err => reject(err));
    });
  }

  getLocation(locationId) {
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

  saveLocation(data) {
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

  updateLocation(locationId, data) {
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

  deleteLocation(locationId) {
    return new Promise((resolve, reject) => {
      this.getLocation(locationId)
        .then((data) => {
          const filter = {
            _id: this.mongoUtil.getObjectID(locationId),
          };
          const newData = _.assign({}, data, {
            deleted: new Date(),
            status: false,
          });
          this.mongoUtil
            .update(this.collectionName, newData, filter)
            .then(results => resolve(results))
            .catch(err => reject(err));
        });
    });
  }
}
