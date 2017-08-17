import ActivityModel from '../../models/activityModel';

export default class ActivityController {

  list(params) {
    const filter = {
      status: true,
      groupId: params.groupId,
    };
    return ActivityModel.find(filter);
  }

  get(activityId) {
    const filter = {
      _id: activityId,
      status: true,
    };
    return ActivityModel.findOne(filter);
  }

  save(data) {
    const activityModel = new ActivityModel(data);
    return activityModel.save();
  }

  update(activityId, data) {
    const filter = {
      _id: activityId,
    };
    return ActivityModel.update(filter, data);
  }

  delete(activityId) {
    const filter = {
      _id: activityId,
    };
    return ActivityModel.remove(filter);
  }
}
