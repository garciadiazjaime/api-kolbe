import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MongoUtil from 'util-mongodb';
import sinon from 'sinon';

import LocationController from '../../../src/controllers/locationController';

const { expect } = chai;
chai.use(chaiAsPromised);


describe('LocationController', () => {
  const locationController = new LocationController();

  describe("#getLocations valid case", () => {
    const validResponse = [{}];

    beforeEach(() => {
      sinon.stub(MongoUtil.prototype, 'find', () => {
        return new Promise((resolve) => {
          resolve(validResponse);
        });
      });
    });

    afterEach(() => {
      MongoUtil.prototype.find.restore();
    });

    it('valid case', () => {
      return expect(locationController.getLocations()).to.eventually.equal(validResponse);
    });

  });

  describe("#getLocations invalid case", () => {
    const invalidResponse = 'error';

    beforeEach(() => {
      sinon.stub(MongoUtil.prototype, 'find', () => {
        return new Promise((resolve, reject) => {
          reject(invalidResponse);
        });
      });
    });

    afterEach(() => {
      MongoUtil.prototype.find.restore();
    });

    it('invalid case', () => {
      return expect(locationController.getLocations()).to.be.rejectedWith(invalidResponse);
    });

  });

});
