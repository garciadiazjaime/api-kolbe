import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  code: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  entityId: { type: ObjectId, required: true },
  schoolId: { type: ObjectId, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
