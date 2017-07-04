import MongoUtil from 'util-mongodb';

export default class ParentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'groupParent';
  }

  list(parentId) {
    const filter = {
      status: true,
      parentId: this.mongoUtil.getObjectID(parentId),
    };
    return this.mongoUtil.find(this.collectionName, filter, {});
  }
}
