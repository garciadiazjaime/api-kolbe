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
    };
    return UserModel.findOne(filter);
  }

  save(user, locationId, schoolId) {
    return this.searchParent(user)
      .then(_user => this.upsetParent(user, _user, locationId, schoolId));
  }

  delete(userId) {
    const filter = {
      _id: userId,
    };
    return UserModel.remove(filter);
  }

  searchParent(user) {
    const filter = {
      username: user.username,
      role: UserController.getRole('parent'),
    };
    return UserModel.findOne(filter);
  }

  upsetParent(user, currentUser, locationId, schoolId) {
    if (!currentUser) {
      const newUser = assign({}, user, {
        entityId: locationId,
        schoolId,
        role: UserController.getRole('parent'),
      });
      return new UserModel(newUser).save();
    }
    currentUser.username = user.username; // eslint-disable-line
    currentUser.updated = new Date(); // eslint-disable-line
    return currentUser.save();
  }
}
