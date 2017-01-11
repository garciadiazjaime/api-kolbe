/* eslint max-len: [2, 500, 4] */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MongoUtil from 'util-mongodb';
import sinon from 'sinon';

import LocationController from '../../../src/controllers/locationController';

const { expect } = chai;
chai.use(chaiAsPromised);


describe('LocationController', () => {
  const locationController = new LocationController();

  describe("#getLocations", () => {
    describe("valid case", () => {
      const validResponse = [{}];
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'find', () => promise);
      });

      afterEach(() => {
        MongoUtil.prototype.find.restore();
      });

      it('resolves a promise', () => expect(locationController.getLocations()).to.eventually.equal(validResponse));
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

      it('rejects a promise', () => expect(locationController.getLocations()).to.be.rejectedWith(invalidResponse));
    });
  });

  describe("#getLocation(locationId)", () => {
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

      it('resolves a promise', () => expect(locationController.getLocation(locationId)).to.eventually.equal(validResponse));
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

      it('rejects a promise', () => expect(locationController.getLocation(locationId)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe("#saveLocation()", () => {
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

      it('resolves a promise', () => expect(locationController.saveLocation(data)).to.eventually.equal(validResponse));
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

      it('rejects a promise', () => expect(locationController.saveLocation(data)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe("#updateLocation()", () => {
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

      it('resolves a promise', () => expect(locationController.updateLocation(locationId, data)).to.eventually.equal(validResponse));
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

      it('rejects a promise', () => expect(locationController.updateLocation(locationId, data)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe("#updateLocation()", () => {
    const locationId = 1;
    const validResponse = {};

    describe("valid case", () => {
      const promise = new Promise((resolve) => resolve(validResponse));
      const promiseLocation = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
        sinon.stub(MongoUtil.prototype, 'findOne', () => promiseLocation);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
        MongoUtil.prototype.findOne.restore();
      });

      it('resolves a promise', () => expect(locationController.deleteLocation(locationId)).to.eventually.equal(validResponse));
    });

    describe("invalid case", () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));
      const promiseLocation = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(MongoUtil.prototype, 'update', () => promise);
        sinon.stub(MongoUtil.prototype, 'findOne', () => promiseLocation);
      });

      afterEach(() => {
        MongoUtil.prototype.update.restore();
        MongoUtil.prototype.findOne.restore();
      });

      it('rejects a promise', () => expect(locationController.deleteLocation(locationId)).to.be.rejectedWith(invalidResponse));
    });
  });
});
