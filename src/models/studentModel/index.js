import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const studentSchema = new Schema({
  name: { type: String },
  groupId: { type: ObjectId, required: true },
  parentId: { type: ObjectId, required: true },
  schoolId: { type: ObjectId, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel;
