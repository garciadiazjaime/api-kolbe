import { isArray } from 'lodash';
import GroupUploadUtil from '../../utils/groupUploadUtil';
import SchoolModel from '../../models/schoolModel';
import UserController from '../userController';
import StudentController from '../studentController';
import { Types } from 'mongoose';

export default class LocationController {

  constructor() {
    this.locationMap = {};
    this.userController = new UserController();
    this.studentController = new StudentController();
  }

  getLocation(locationId) {
    const filter = {
      'location.id': new Types.ObjectId(locationId),
    };
    const projection = {
      'location.$.id': true,
    };
    return SchoolModel.find(filter, projection);
  }

  setLevels(locationId) {
    return this.getLocation(locationId)
      .then(school => {
        if (isArray(school)
          && school.length
          && isArray(school[0].location)
          && school[0].location.length) {
          school[0].location[0].level.forEach(level => {
            this.locationMap[level.weight] = {
              id: level.id,
              name: level.name,
            };
            level.grade.forEach(grade => {
              this.locationMap[level.weight][grade.weight] = {
                id: grade.id,
                name: grade.name,
              };
              grade.group.forEach(group => {
                this.locationMap[level.weight][grade.weight][group.name.toUpperCase()] = {
                  id: group.id,
                };
              });
            });
          });
        }
      });
  }

  upload(schoolId, locationId, file) {
    const groupUploadUtil = new GroupUploadUtil();
    const users = groupUploadUtil.process(file.data);
    return new Promise((resolve, reject) => {
      this.setLevels(locationId)
        .then(() => {
          const promises = users.map((item) => {
            const { groups, user } = item;
            return this.userController
              .save(user, locationId, schoolId)
              .then(parent => this.studentController.saveBulk(parent, groups, schoolId, this.locationMap)); // eslint-disable-line
          });
          return Promise.all(promises).then(resolve).catch(reject);
        })
        .catch(reject);
    });
  }
}
