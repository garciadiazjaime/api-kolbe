/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

export default class GroupStudentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'groupParent';
  }

  save(groupId, parentId) {
    if (!groupId || !parentId) {
      return null;
    }
    const newData = _.assign({}, {
      status: true,
      created: new Date(),
      groupId: this.mongoUtil.getObjectID(groupId),
      parentId,
    });
    return this.mongoUtil.insert(this.collectionName, newData);
  }

  update(identityId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, data, {
      updated: new Date(),
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }

  upload(groupId, parentId) {
    const filter = {
      groupId,
      parentId,
    };
    return this.mongoUtil.findOne(this.collectionName, filter)
      .then(results => this.upsert(results, groupId, parentId));
  }

  upsert(entity, groupId, parentId) {
    if (entity) {
      const newData = _.assign({}, entity, {
        status: true,
        deleted: null,
      });
      return this.update(entity._id, newData);
    }
    return this.save(groupId, parentId);
  }

}
