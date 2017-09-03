/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import UserModel from '../../models/userModel';

export default class UserController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'user';
  }

  get(userId) {
    const filter = {
      _id: userId,
      status: true,
    };
    return UserModel.findOne(filter);
  }

  save(username, password, groupId, schoolId) {
    const filter = {
      username,
      password,
      status: true,
    };
    return UserModel.findOne(filter)
      .then((user) => {
        if (!user) {
          const newUser = {
            username,
            password,
            role: UserController.getRole('parent'),
            entityId: groupId,
            schoolId,
          };
          const userModel = new UserModel(newUser);
          return userModel.save();
        }
        return Promise.resolve(user);
      });
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

  upload(data) {
    return this.findByUsername(data)
      .then(results => this.upsert(results, data))
      .then(results => this.extractId(results));
  }

  findByUsername(data) {
    const filter = {
      username: data.username,
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

  static getRole(entity) {
    const key = entity ? entity.toUpperCase() : '';
    const roles = {
      ADMIN: 0,
      DIRECTOR: 1,
      PROFESSOR: 2,
      PARENT: 3,
    };
    return roles[key] || null;
  }
}
