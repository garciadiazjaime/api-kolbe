import mongoose from 'mongoose';

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  role: Number,
  entityId: ObjectId,
  status: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
