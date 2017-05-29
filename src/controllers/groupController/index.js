/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import XlsxUtil from '../../utils/xlsxUtil';
import GroupUpload from '../../utils/groupUpload';
import StudentController from '../studentController';
import ParentController from '../parentController';
import ParentStudentController from '../parentStudentController';
import GroupStudentController from '../groupStudentController';

export default class GroupController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'group';
    this.groupUpload = new GroupUpload();
    this.studentController = new StudentController();
    this.parentController = new ParentController();
    this.parentStudentController = new ParentStudentController();
    this.groupStudentController = new GroupStudentController();
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

  uploadv2(groupId, file) {
    const { data } = file;
    const dataFromFile = XlsxUtil.parseBufferToJson(data.data).pop();
    if (_.isArray(dataFromFile.data) && dataFromFile.data.length) {
      const parentByCode = this.getParentByCode(dataFromFile.data);
      const promises = [];

      _.forIn(parentByCode, (item) => {
        const internalPromises = [];
        internalPromises.push(this.parentController.upload(item.parent));
        item.students.forEach((student) => {
          internalPromises.push(this.studentController.upload(student));
        });
        promises.push(Promise.all(internalPromises));
      });

      return Promise.all(promises).then((results) => {
        const internalPromises = [];
        results.forEach((item) => {
          let parentId = null;
          let studentId = null;
          item.forEach((entityId, index) => {
            if (index === 0) {
              parentId = entityId;
            } else {
              studentId = entityId;
              internalPromises.push(this.parentStudentController.upload(parentId, studentId));
              internalPromises.push(this.groupStudentController.upload(groupId, studentId));
            }
          });
        });
        return Promise.all(internalPromises);
      });
    }
    return Promise.reject('wrong file data');
  }

  getParentByCode(data) {
    const parentByCode = {};
    data.forEach((item, index) => {
      if (index === 0) {
        this.groupUpload.setColumns(item);
      } else {
        const { parent, student } = this.groupUpload.getEntities(item);
        if (!parentByCode[parent.code]) {
          parentByCode[parent.code] = {
            parent,
            students: [],
          };
        }
        parentByCode[parent.code].students.push(student);
      }
    });
    return parentByCode;
  }

  upload(identityId, file) {
    return new Promise((resolve, reject) => {
      try {
        const { data } = file;
        const dataFromFile = XlsxUtil.parseBufferToJson(data.data).pop();
        if (_.isArray(dataFromFile.data) && dataFromFile.data.length) {
          const promises = dataFromFile.data.map((item, index) => {
            if (index === 0) {
              this.groupUpload.setColumns(item);
              return null;
            }
            const entities = this.groupUpload.getEntities(item);
            return this.uploadHelper(identityId, entities);
          });
          Promise.all(promises).then(() => resolve('saved'));
        } else {
          reject('wrong file');
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  uploadHelper(identityId, entities) {
    return Promise.all([
      this.parentController.upload(entities.parent),
      this.studentController.upload(entities.student),
    ]).then((results) => {
      const parentId = results[0];
      const studentId = results[1];
      return Promise.all([
        this.parentStudentController.upload(parentId, studentId),
        this.groupStudentController.upload(identityId, studentId),
      ]);
    });
  }
}
