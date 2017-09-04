/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import mongoose from 'mongoose';
import _ from 'lodash';

import UserController from '../../controllers/userController';
import SchoolModel from '../../models/schoolModel';
import UserModel from '../../models/userModel';
import config from '../../config';

mongoose.Promise = global.Promise;

const cleanString = string => string.toLowerCase()
  .replace(/\s/g, '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, "");

class CreateGroupUsers {

  getUsers(school) {
    const users = [];
    if (school && _.isArray(school.location) && school.location.length) {
      school.location.forEach((location) => {
        if (_.isArray(location.level) && location.level.length) {
          location.level.forEach((level) => {
            if (_.isArray(level.grade) && level.grade.length) {
              level.grade.forEach((grade) => {
                if (_.isArray(grade.group) && grade.group.length) {
                  grade.group.forEach((group) => {
                    const username = cleanString(`${location.name}_${level.name}_${grade.name}${group.name}@irk.mx`);
                    const password = cleanString(`${location.name}_${grade.name}${group.name}`);
                    users.push({
                      username,
                      password,
                      role: UserController.getRole('group'),
                      entityId: group.id,
                      schoolId: school._id,
                    });
                  });
                }
              });
            }
          });
        }
      });
    }
    return users;
  }

  saveUsers(users) {
    const promises = [];
    if (_.isArray(users) && users.length) {
      users.forEach((user) => {
        const userModel = new UserModel(user);
        promises.push(userModel.save());
      });
    }
    return Promise.all(promises);
  }

  report(results) {
    console.log(`${results.length} users created`);
  }

  process() {
    SchoolModel.findOne()
      .then(this.getUsers)
      .then(this.saveUsers)
      .then(this.report)
      .catch(console.log)
      .then(process.exit);
  }
}

const createGroupUsers = new CreateGroupUsers();
mongoose.connect(config.get('db.url'), {
  useMongoClient: true,
}).then(createGroupUsers.process());
