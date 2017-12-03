import { assign } from 'lodash';
import ActivityModel from '../../models/activityModel';

export default class ActivityController {

  list(params) {
    const filter = {
      groups: params.groupId,
    };
    return ActivityModel.find(filter).sort({
      date: -1,
    });
  }

  get(activityId) {
    const filter = {
      _id: activityId,
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

  delete(params) {
    const { activityId, groupId } = params;
    return this.get(activityId)
      .then((activity) => {
        const { groups } = activity;
        const newGroups = groups.filter(gId => gId !== groupId);
        if (newGroups.length) {
          return this.update(activityId, assign(activity, {
            groups: newGroups,
          }));
        }
        const filter = {
          _id: activityId,
        };
        return ActivityModel.remove(filter);
      });
  }
}
