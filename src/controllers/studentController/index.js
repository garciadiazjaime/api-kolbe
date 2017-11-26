/* eslint max-len: [2, 500, 4] */
import UserController from '../userController';
import StudentModel from '../../models/studentModel';

export default class StudentController {

  constructor() {
    this.userController = new UserController();
  }

  list(groupId) {
    const filter = {
      groupId,
    };

    return StudentModel.find(filter)
      .then(students => Promise.all(students.map(student => this.userController.get(student.parentId))));
  }

  parentList(parentId) {
    const filter = {
      parentId,
    };
    return StudentModel.find(filter);
  }

  save(parent, groupId, schoolId) {
    const filter = {
      parentId: parent.id,
      groupId,
    };
    return StudentModel.findOne(filter)
      .then(student => {
        if (!student) {
          const newStudent = {
            groupId,
            parentId: parent.id,
            schoolId,
          };
          const studentModel = new StudentModel(newStudent);
          return studentModel.save();
        }
        return Promise.resolve(student);
      });
  }

  saveBulk(parent, groups, schoolId, locationMap) {
    const promises = groups.map(group => {
      const _group = locationMap[group.level][group.grade][group.group.toUpperCase()]; // eslint-disable-line
      const filter = {
        parentId: parent.id,
        groupId: _group.id,
      };
      return StudentModel.findOne(filter)
        .then(student => {
          if (!student) {
            const newStudent = {
              groupId: _group.id,
              parentId: parent.id,
              schoolId,
            };
            const studentModel = new StudentModel(newStudent);
            return studentModel.save();
          }
          return Promise.resolve(student);
        });
    });
    return Promise.all(promises);
  }

  delete(groupId, parentId) {
    const filter = {
      groupId,
      parentId,
    };
    return StudentModel.remove(filter)
      .then(() => StudentModel.find({ parentId }))
      .then((students) => {
        if (!students.length) {
          return this.userController.delete(parentId);
        }
        return Promise.resolve(true);
      });
  }
}
