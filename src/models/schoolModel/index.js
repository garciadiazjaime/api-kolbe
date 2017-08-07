import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: String,
  status: { type: Boolean, default: true },
  location: Array,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const SchoolModel = mongoose.model('School', schoolSchema);

export default SchoolModel;
