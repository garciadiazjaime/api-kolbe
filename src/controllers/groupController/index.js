/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import UserModel from '../../models/userModel';
import StudentModel from '../../models/studentModel';

import XlsxUtil from '../../utils/xlsxUtil';
import UserController from '../userController';
import GroupParentController from '../groupParentController';

export default class GroupController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'group';
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

  upload(groupId, file, schoolId) {
    const dataFromFile = XlsxUtil.parseBufferToJson(file.data).pop();
    if (_.isArray(dataFromFile.data) && dataFromFile.data.length) {
      const userByCode = XlsxUtil.dedupUsers(dataFromFile.data);
      const promises = [];
      _.forIn(userByCode, (item) => {
        if (item.user.username && item.user.password) {
          promises.push(new Promise((resolve, reject) => {
            const userFilter = {
              username: item.user.username,
              password: item.user.password,
              status: true,
            };
            UserModel.findOne(userFilter)
              .then((user) => {
                if (!user) {
                  const newUser = {
                    username: item.user.username,
                    password: item.user.password,
                    role: 3,
                    entityId: groupId,
                    schoolId,
                  };
                  const userModel = new UserModel(newUser);
                  return userModel.save();
                }
                return Promise.resolve(user);
              })
              .then((user) => {
                const filter = {
                  groupId,
                  parentId: user._id,
                  status: true,
                };
                return StudentModel.findOne(filter).then((student) => {
                  if (!student) {
                    const newStudent = {
                      groupId,
                      parentId: user._id,
                      schoolId,
                    };
                    const studentModel = new StudentModel(newStudent);
                    return studentModel.save();
                  }
                  return resolve(student);
                });
              })
              .catch((error) => reject(error));
          }));
        }
      });

      return Promise.all(promises)
        .then((results) => ({
          status: true,
          users: results.length,
        }))
        .catch((error) => ({
          status: false,
          error,
        }));
    }
    return Promise.reject('wrong file data');
  }
}
