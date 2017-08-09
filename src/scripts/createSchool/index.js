/* eslint import/no-unresolved: [2, { ignore: ['\.data\.js$'] }] */
import mongoose from 'mongoose';

import SchoolModel from '../../models/schoolModel';
import schoolData from './data/school';
import config from '../../config';

mongoose.Promise = global.Promise;
const dbConnectionPromise = mongoose.connect(config.get('db.url'), {
  useMongoClient: true,
});

class CreateSchool {

  static main() {
    dbConnectionPromise
      .then(() => SchoolModel.collection.drop())
      .catch(console.log)
      .then(CreateSchool.importSchool)
      .then(console.log)
      .catch(console.log)
      .then(process.exit);
  }

  static importSchool() {
    const schoolModel = new SchoolModel(schoolData);
    return schoolModel.save();
  }
}

CreateSchool.main();
