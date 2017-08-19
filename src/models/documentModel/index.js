import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const documentSchema = new Schema({
  name: { type: String, required: true },
  file: { type: String, required: true },
  realFile: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  groupId: { type: ObjectId, required: true },
  status: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const DocumentModel = mongoose.model('Document', documentSchema);

export default DocumentModel;
