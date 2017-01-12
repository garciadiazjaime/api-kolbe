/* eslint max-len: [2, 500, 4] */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MongoUtil from 'util-mongodb';
import sinon from 'sinon';

import PeriodController from '../../../src/controllers/periodController';

const { expect } = chai;
chai.use(chaiAsPromised);


describe('PeriodController', () => {
  const periodController = new PeriodController();

  describe("#list", () => {
    describe("valid case", () => {
      const validResponse = [{}];
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'find', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.find.restore();
      });

      it('resolves a promise', () => expect(periodController.list()).to.eventually.equal(validResponse));
    });

    describe("invalid case", () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'find', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.find.restore();
      });

      it('rejects a promise', () => expect(periodController.list()).to.be.rejectedWith(invalidResponse));
    });
  });

  describe("#get(locationId)", () => {
    const locationId = 1;

    describe("valid case", () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'findOne', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.findOne.restore();
      });

      it('resolves a promise', () => expect(periodController.get(locationId)).to.eventually.equal(validResponse));
    });

    describe("invalid case", () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'findOne', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.findOne.restore();
      });

      it('rejects a promise', () => expect(periodController.get(locationId)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe("#save()", () => {
    const data = {};

    describe("valid case", () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'insert', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.insert.restore();
      });

      it('resolves a promise', () => expect(periodController.save(data)).to.eventually.equal(validResponse));
    });

    describe("invalid case", () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'insert', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.insert.restore();
      });

      it('rejects a promise', () => expect(periodController.save(data)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe("#update()", () => {
    const locationId = 1;
    const data = {};

    describe("valid case", () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('resolves a promise', () => expect(periodController.update(locationId, data)).to.eventually.equal(validResponse));
    });

    describe("invalid case", () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('rejects a promise', () => expect(periodController.update(locationId, data)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe("#delete()", () => {
    const locationId = 1;
    const validResponse = {};

    describe("valid case", () => {
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('resolves a promise', () => expect(periodController.delete(locationId)).to.eventually.equal(validResponse));
    });

    describe("invalid case", () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));
      const promiseLocation = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
      });

      it('rejects a promise', () => expect(periodController.delete(locationId)).to.be.rejectedWith(invalidResponse));
    });
  });
});
