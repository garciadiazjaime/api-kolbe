import mongoose from 'mongoose';

import SchoolModel from '../../models/schoolModel';
import schoolData from './data/school';
import config from '../../config';

mongoose.Promise = global.Promise;

const promise = mongoose.connect(config.get('db.url'), {
  useMongoClient: true,
});

promise.then(db => SchoolModel.collection.drop(importSchool));

const importSchool = () => {
  const schoolModel = new SchoolModel(schoolData);
  schoolModel.save(handleOutput);
};

const handleOutput = (error) => {
  if (error) {
    console.log('error', error);
  } else {
    console.log('school saved');
  }
  process.exit(0);
};
