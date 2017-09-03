/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';

import GroupUploadUtil from '../../utils/groupUploadUtil';
import UserController from '../userController';
import StudentController from '../studentController';

export default class GroupController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'group';
    this.userController = new UserController();
    this.studentController = new StudentController();
  }

  upload(groupId, file, schoolId) {
    const groupUploadUtil = new GroupUploadUtil();
    const users = groupUploadUtil.process(file.data);

    const promises = users.map((item) => {
      const { user } = item;
      return this.userController
        .save(user.username, user.password, groupId, schoolId)
        .then((parent) => this.studentController.save(parent._id, groupId, schoolId));
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
}
