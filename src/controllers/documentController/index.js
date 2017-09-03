import DocumentModel from '../../models/documentModel';

import _ from 'lodash';

import FileUtil from '../../utils/fileUtil';

export default class DocumentController {

  constructor() {
    this.fileUtil = new FileUtil();
  }

  list(params) {
    const filter = {
      status: true,
      groupId: params.groupId,
    };
    return DocumentModel.find(filter);
  }

  get(documentId) {
    const filter = {
      _id: documentId,
      status: true,
    };
    return DocumentModel.findOne(filter);
  }

  save(groupId, data, files) {
    const newData = _.assign({}, JSON.parse(data.data), {
      groupId,
    });
    return this.fileUtil.save(files.file)
      .then((fileName) => {
        newData.realFile = fileName;
        const documentModel = new DocumentModel(newData);
        return documentModel.save();
      });
  }

  update(documentId, data, files) {
    const promise = files && files.file ? this.fileUtil.save(files.file) : Promise.resolve();
    const filter = {
      _id: documentId,
    };
    const newData = _.assign({}, JSON.parse(data.data));
    return promise.then((fileName) => {
      if (fileName) {
        newData.realFile = fileName;
      }
      return DocumentModel.update(filter, newData);
    });
  }

  delete(documentId) {
    const filter = {
      _id: documentId,
    };
    return DocumentModel.remove(filter);
  }
}
