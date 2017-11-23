import { assign } from 'lodash';
import UserModel from '../../models/userModel';

export default class UserController {

  static getRole(entity) {
    const key = entity ? entity.toUpperCase() : '';
    const roles = {
      PARENT: 3,
      GROUP: 2,
    };
    return roles[key] || null;
  }

  get(userId) {
    const filter = {
      _id: userId,
      status: true,
    };
    return UserModel.findOne(filter);
  }

  save(user, entityId, schoolId) {
    return this.searchUser(user)
      .then(_user => this.upsetAccount(user, _user, entityId, schoolId));
  }

  delete(userId) {
    const filter = {
      _id: userId,
    };
    return UserModel.remove(filter);
  }

  searchUser(user) {
    const filter = {
      code: user.code,
    };
    return UserModel.findOne(filter);
  }

  upsetAccount(user, currentUser, entityId, schoolId) {
    if (!currentUser) {
      const newUser = assign({}, user, {
        entityId,
        schoolId,
      });
      return new UserModel(newUser).save();
    }
    currentUser.username = user.username; // eslint-disable-line
    currentUser.updated = new Date(); // eslint-disable-line
    return currentUser.save();
  }
}
