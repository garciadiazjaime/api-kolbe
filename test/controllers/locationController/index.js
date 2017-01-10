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

  describe("#getLocations valid case", () => {
    const validResponse = [{}];
    const promise = new Promise((resolve) => resolve(validResponse));

    beforeEach(() => {
      sinon.stub(MongoUtil.prototype, 'find', () => promise);
    });

    afterEach(() => {
      MongoUtil.prototype.find.restore();
    });

    it('valid case', () => expect(locationController.getLocations()).to.eventually.equal(validResponse));
  });

  describe("#getLocations invalid case", () => {
    const invalidResponse = 'error';
    const promise = new Promise((_, reject) => reject(invalidResponse));

    beforeEach(() => {
      sinon.stub(MongoUtil.prototype, 'find', () => promise);
    });

    afterEach(() => {
      MongoUtil.prototype.find.restore();
    });

    it('invalid case', () => expect(locationController.getLocations()).to.be.rejectedWith(invalidResponse));
  });
});
