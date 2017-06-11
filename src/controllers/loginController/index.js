/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import _ from 'lodash';
import MongoUtil from 'util-mongodb';

const PARENT_ROLE = 3;

export default class LoginController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionParent = 'parent';
    this.collectionUser = 'user';
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.loginParent(data)
        .then((results) => {
          console.log('results1', results);
          if (results) {
            return resolve(_.assign({}, results, {
              role: PARENT_ROLE,
              id: results._id,
            }));
          }
          return this.loginAdmin(data)
            .then((results2) => {
              console.log('results2', results2);
              if (results2) {
                return resolve(_.assign({}, {
                  role: results2.role,
                  id: results2.entityId,
                }));
              }
              return reject('invalid user');
            });
        })
        .catch(error => reject(error));
    });
  }

  loginParent(data) {
    const filter = {
      email: data.username,
      code: data.password,
    };
    return this.mongoUtil.findOne(this.collectionParent, filter);
  }

  loginAdmin(data) {
    const filter = {
      email: data.username,
      password: data.password,
    };
    return this.mongoUtil.findOne(this.collectionUser, filter);
  }

}
