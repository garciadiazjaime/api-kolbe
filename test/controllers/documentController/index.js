/* eslint max-len: [2, 500, 4] */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MongoUtil from 'util-mongodb';
import sinon from 'sinon';

import DocumentController from '../../../src/controllers/documentController';

const { expect } = chai;
chai.use(chaiAsPromised);


describe('DocumentController', () => {
  const controller = new DocumentController();
  const params = {};

  describe('#list', () => {
    describe('valid case', () => {
      const validResponse = [{}];
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'find', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.find.restore();
      });

      it('resolves a promise', () => expect(controller.list(params)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'find', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.find.restore();
      });

      it('rejects a promise', () => expect(controller.list(params)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#get', () => {
    const documentId = 1;

    describe('valid case', () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'findOne', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.findOne.restore();
      });

      it('resolves a promise', () => expect(controller.get(documentId)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'findOne', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.findOne.restore();
      });

      it('rejects a promise', () => expect(controller.get(documentId)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#save', () => {
    const groupId = 'groupId';
    const data = {
      data: JSON.stringify({}),
    };

    describe('valid case', () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));
      const files = {
        file: {
          name: 'filename',
          mv: sinon.stub().returns(Promise.resolve()),
        },
      };

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'insert', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.insert.restore();
      });

      it('resolves a promise', () => {
        expect(controller.save(groupId, data, files)).to.eventually.equal(validResponse);
        expect(files.file.mv.calledOnce).to.equal(true);
      });
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));
      const files = {
        file: {
          name: 'filename',
          mv: sinon.stub().returns(Promise.resolve()),
        },
      };

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'insert', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.insert.restore();
      });

      it('rejects a promise', () => {
        expect(controller.save(groupId, data, files)).to.be.rejectedWith(invalidResponse);
        expect(files.file.mv.calledOnce).to.equal(true);
      });
    });
  });

  describe('#update', () => {
    const documentId = 1;
    const data = {
      data: JSON.stringify({}),
    };

    describe('valid case', () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('resolves a promise', () => {
        expect(controller.update(documentId, data)).to.eventually.equal(validResponse);
      });
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('rejects a promise', () => {
        expect(controller.update(documentId, data)).to.be.rejectedWith(invalidResponse);
      });
    });
  });

  describe('#delete', () => {
    const documentId = 1;
    const validResponse = {};

    describe('valid case', () => {
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('resolves a promise', () => expect(controller.delete(documentId)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('rejects a promise', () => expect(controller.delete(documentId)).to.be.rejectedWith(invalidResponse));
    });
  });
});
