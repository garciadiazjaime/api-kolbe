import UserModel from '../../models/userModel';

export default class LoginController {

  login(data) {
    const filter = {
      username: data.username,
      password: data.password,
      status: true,
    };
    return UserModel.findOne(filter);
  }

}
