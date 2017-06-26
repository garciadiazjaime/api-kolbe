import MongoUtil from 'util-mongodb';

export default class LoginController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'user';
  }

  login(data) {
    const filter = {
      username: data.username,
      password: data.password,
      status: true,
    };
    return this.mongoUtil.findOne(this.collectionName, filter);
  }

}
