/* eslint max-len: [2, 500, 4] */
import UserController from '../userController';
import StudentModel from '../../models/studentModel';

export default class StudentController {

  constructor() {
    this.userController = new UserController();
  }

  list(groupId) {
    const filter = {
      status: true,
      groupId,
    };

    return StudentModel.find(filter)
      .then(students => Promise.all(students.map(student => this.userController.get(student.parentId))));
  }

  parentList(parentId) {
    const filter = {
      status: true,
      parentId,
    };
    return StudentModel.find(filter);
  }

  save(parentId, groupId, schoolId) {
    const filter = {
      groupId,
      parentId,
      status: true,
    };
    return StudentModel.findOne(filter)
      .then((student) => {
        if (!student) {
          const newStudent = {
            groupId,
            parentId,
            schoolId,
          };
          const studentModel = new StudentModel(newStudent);
          return studentModel.save();
        }
        return Promise.resolve(student);
      });
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
