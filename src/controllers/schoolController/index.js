import SchoolModel from '../../models/schoolModel';

export default class SchoolController {

  get(schoolId) {
    const filter = {
      _id: schoolId,
      status: true,
    };
    return SchoolModel.findOne(filter);
  }
}
