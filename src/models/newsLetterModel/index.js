import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const newsLetterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  groupId: { type: ObjectId, required: true },
  status: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const NewsLetterModel = mongoose.model('Newsletter', newsLetterSchema);

export default NewsLetterModel;
