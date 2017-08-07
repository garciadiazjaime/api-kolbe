import mongoose from 'mongoose';

import SchoolModel from '../../models/schoolModel';
import UserModel from '../../models/userModel';
import config from '../../config';

mongoose.connect(config.get('db.url'));

// const data = {
//   username: 'username',
//   password: 'password',
//   role: 'role',
// };
//
// const userModel = new UserModel(data);
//
// userModel.save((error) => {
//   console.log('error', error);
// });

SchoolModel.find({}, (error, data) => {
  console.log('error', error);
  console.log('data', data);
});
