/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import UserController from '../userController';

export default class GroupParentController {

  constructor() {
    this.collectionName = 'groupParent';
    this.mongoUtil = new MongoUtil();
    this.userController = new UserController();
  }

  list(groupId) {
    if (!groupId) {
      return null;
    }
    const filter = {
      status: true,
      groupId: this.mongoUtil.getObjectID(groupId),
    };
    return this.mongoUtil.find(this.collectionName, filter, {})
      .then(results => Promise.all(results.map(item => this.userController.get(item.parentId))));
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

  delete(groupId, parentId) {
    const filter = {
      groupId: this.mongoUtil.getObjectID(groupId),
      parentId: this.mongoUtil.getObjectID(parentId),
      status: true,
    };
    const newData = _.assign({}, {
      deleted: new Date(),
      status: false,
    });
    return this.mongoUtil.update(this.collectionName, newData, filter)
      .then(() => this.isParentActive(parentId))
      .then(results => this.disableParent(results, parentId));
  }

  isParentActive(parentId) {
    const filter = {
      parentId: this.mongoUtil.getObjectID(parentId),
      status: true,
    };
    return this.mongoUtil.find(this.collectionName, filter);
  }

  disableParent(results, parentId) {
    if (!results) {
      return this.userController.delete(parentId);
    }
    return null;
  }

}
