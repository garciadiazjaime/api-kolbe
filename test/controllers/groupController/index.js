/* eslint max-len: [2, 500, 4] */
import fs from 'fs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MongoUtil from 'util-mongodb';
import sinon from 'sinon';

import GroupController from '../../../src/controllers/groupController';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('GroupController', () => {
  const controller = new GroupController();

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

      it('resolves a promise', () => expect(controller.list()).to.eventually.equal(validResponse));
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

      it('rejects a promise', () => expect(controller.list()).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#get', () => {
    const locationId = 1;

    describe('valid case', () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'findOne', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.findOne.restore();
      });

      it('resolves a promise', () => expect(controller.get(locationId)).to.eventually.equal(validResponse));
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

      it('rejects a promise', () => expect(controller.get(locationId)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#save', () => {
    const data = {};

    describe('valid case', () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'insert', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.insert.restore();
      });

      it('resolves a promise', () => expect(controller.save(data)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'insert', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.insert.restore();
      });

      it('rejects a promise', () => expect(controller.save(data)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#update', () => {
    const locationId = 1;
    const data = {};

    describe('valid case', () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('resolves a promise', () => expect(controller.update(locationId, data)).to.eventually.equal(validResponse));
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

      it('rejects a promise', () => expect(controller.update(locationId, data)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#delete', () => {
    const locationId = 1;
    const validResponse = {};

    describe('valid case', () => {
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('resolves a promise', () => expect(controller.delete(locationId)).to.eventually.equal(validResponse));
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

      it('rejects a promise', () => expect(controller.delete(locationId)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#upload', () => {
    const groupId = 1;

    describe('valid case', () => {
      beforeEach(() => {
        sinon.stub(controller.userController, 'upload', () => Promise.resolve());
        sinon.stub(controller.groupParentController, 'upload', () => Promise.resolve());
      });

      afterEach(() => {
        controller.userController.upload.restore();
        controller.groupParentController.upload.restore();
      });

      it('resolves a promise', () => {
        const promiseResults = controller.upload(groupId, {
          data: fs.readFileSync(`${process.env.PWD}/test/stub/LISTA_DE_ALUMNOS.xlsx`),
        });

        expect(promiseResults).to.eventually.equal('saved');
      });
    });
  });
});
