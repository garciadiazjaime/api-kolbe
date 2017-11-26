/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import GroupUploadUtil from '../../utils/groupUploadUtil';
import UserController from '../userController';
import StudentController from '../studentController';

export default class GroupController {

  constructor() {
    this.userController = new UserController();
    this.studentController = new StudentController();
  }

  list(parentId) {
    return this.studentController.parentList(parentId);
  }

  upload(groupId, locationId, file, schoolId) {
    const groupUploadUtil = new GroupUploadUtil();
    const users = groupUploadUtil.processGroup(file.data);

    const promises = users.map((item) => {
      const { user } = item;
      return this.userController
        .save(user, locationId, schoolId)
        .then(parent => this.studentController.save(parent, groupId, schoolId));
    });

    return Promise.all(promises)
      .then(results => ({
        status: true,
        users: results.length,
      }))
      .catch(error => ({
        status: false,
        error,
      }));
  }
}
