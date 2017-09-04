/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import UserModel from '../../models/userModel';

export default class UserController {

  static getRole(entity) {
    const key = entity ? entity.toUpperCase() : '';
    const roles = {
      PARENT: 3,
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

  save(username, password, groupId, schoolId) {
    const filter = {
      username,
      password,
      status: true,
    };
    return UserModel.findOne(filter)
      .then((user) => {
        if (!user) {
          const newUser = {
            username,
            password,
            role: UserController.getRole('parent'),
            entityId: groupId,
            schoolId,
          };
          const userModel = new UserModel(newUser);
          return userModel.save();
        }
        return Promise.resolve(user);
      });
  }

  delete(userId) {
    const filter = {
      _id: userId,
    };
    return UserModel.remove(filter);
  }
}
