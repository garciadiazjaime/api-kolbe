import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import FileUtil from '../../utils/fileUtil';

export default class DocumentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'document';
    this.fileUtil = new FileUtil();
  }

  list(params) {
    const filter = {
      status: true,
    };
    if (params.groupId) {
      filter.groupId = params.groupId;
    }
    return this.mongoUtil.find(this.collectionName, filter, {});
  }

  get(identityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
      status: true,
    };
    return this.mongoUtil.findOne(this.collectionName, filter);
  }

  save(groupId, data, files) {
    const newData = _.assign({}, JSON.parse(data.data), {
      status: true,
      created: new Date(),
      groupId,
    });
    return this.fileUtil.save(files.file)
      .then((fileName) => {
        newData.realFile = fileName;
        return this.mongoUtil.insert(this.collectionName, newData);
      });
  }

  update(identityId, data, files) {
    const promise = files && files.file ? this.fileUtil.save(files.file) : Promise.resolve();
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, JSON.parse(data.data), {
      updated: new Date(),
    });
    return promise.then((fileName) => {
      if (fileName) {
        newData.realFile = fileName;
      }
      this.mongoUtil.update(this.collectionName, newData, filter);
    });
  }

  delete(identityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, {
      deleted: new Date(),
      status: false,
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }
}
