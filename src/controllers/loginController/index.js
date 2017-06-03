/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';

export default class LoginController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionParent = 'parent';
    this.collectionProfesor = 'group';
  }

  loginParent(data) {
    const filter = {
      email: data.username,
      code: data.password,
    };
    return this.mongoUtil.findOne(this.collectionParent, filter)
      .then(results => ({ id: results._id, role: 3 }));
  }

}
