import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  groups: { type: Array, default: [] },
});

const ActivityModel = mongoose.model('Activity', activitySchema);

export default ActivityModel;
