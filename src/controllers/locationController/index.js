import MongoUtil from 'util-mongodb';


export default class LocationController {

  constructor() {
    this.mongoUtil = new MongoUtil();
  }

  getLocations() {
    return new Promise((resolve, reject) => {
      this.mongoUtil.find('location', {}, {})
          .then(results => resolve(results))
          .catch(err => reject(err));
    });
  }

  getLocation(locationId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(locationId),
    };
    return new Promise((resolve, reject) => {
      this.mongoUtil
        .findOne('location', filter)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  }
}
