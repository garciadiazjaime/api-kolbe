/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import XlsxUtil from '../../utils/xlsxUtil';
import GroupUploadUtil from '../../utils/groupUploadUtil';
import UserController from '../userController';
import GroupParentController from '../groupParentController';

export default class GroupController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'group';
    this.groupUploadUtil = new GroupUploadUtil();
    this.userController = new UserController();
    this.groupParentController = new GroupParentController();
  }

  list(parentId) {
    const filter = {
      status: true,
      parentId,
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

  save(parentId, data) {
    const newData = _.assign({}, data, {
      parentId,
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

  upload(groupId, file) {
    const dataFromFile = XlsxUtil.parseBufferToJson(file.data).pop();
    if (_.isArray(dataFromFile.data) && dataFromFile.data.length) {
      const userByCode = this.dedupUsers(dataFromFile.data);
      const promises = [];

      _.forIn(userByCode, (item) => {
        if (item.user && item.user.username && item.user.password) {
          this.userController.upload(item.user)
            .then((userId) => promises.push(this.groupParentController.upload(groupId, userId)));
        }
      });

      return Promise.all(promises);
    }
    return Promise.reject('wrong file data');
  }

  dedupUsers(data) {
    const userByCode = {};
    data.forEach((item, index) => {
      if (index === 0) {
        this.groupUploadUtil.setColumns(item);
      } else {
        const { user } = this.groupUploadUtil.getEntities(item);
        if (!userByCode[user.password]) {
          userByCode[user.password] = {
            user,
          };
        }
      }
    });
    return userByCode;
  }
}
