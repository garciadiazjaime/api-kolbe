/* eslint max-len: [2, 500, 4] */
import mongoose from 'mongoose';
import _ from 'lodash';

import SchoolModel from '../../models/schoolModel';
import UserModel from '../../models/userModel';
import config from '../../config';

mongoose.Promise = global.Promise;

const userData = require('./user.json');
const dbConnectionPromise = mongoose.connect(config.get('db.url'), {
  useMongoClient: true,
});

class CreateAdminUsers {

  static main() {
    dbConnectionPromise.then(() => UserModel.collection.drop(CreateAdminUsers.loadAdminUsers));
  }

  static loadAdminUsers() {
    SchoolModel.find({}).then((data) => {
      const school = data.pop();
      const { location, id } = school;
      const users = CreateAdminUsers.getUsers(id, location);
      const promises = users.map(CreateAdminUsers.createUser);

      Promise.all(promises).then(console.log)
      .catch(console.log)
      .then(process.exit);
    })
    .catch((error) => {
      console.log(error);
      process.exit(0);
    });
  }

  static getUsers(schoolId, location) {
    const adminUsers = CreateAdminUsers.getAdminUsers(schoolId);
    const usersPerLocation = location.map(item => CreateAdminUsers.getUsersPerLocation(item, schoolId));

    let users = [].concat(adminUsers);
    usersPerLocation.forEach((item) => {
      users = users.concat(item);
    });
    return users;
  }

  static getAdminUsers(schoolId) {
    const adminUsers = userData.filter((userRow) => userRow.role === 5);
    return adminUsers.map(item => CreateAdminUsers.getNewUser(item, schoolId, schoolId));
  }

  static getUsersPerLocation(location, schoolId) {
    const usersFromLocation = userData.filter((userRow) => location.code === userRow.location);
    return usersFromLocation.map((item) => CreateAdminUsers.getNewUser(item, location.id, schoolId));
  }

  static getNewUser(data, entityId, schoolId) {
    return _.assign({}, data, {
      entityId,
      schoolId,
    });
  }

  static createUser(newUser) {
    const userModel = new UserModel(newUser);
    return userModel.save();
  }
}

CreateAdminUsers.main();
