/* eslint max-len: [2, 500, 4] */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ActivityModel from '../../../src/models/activityModel';
import sinon from 'sinon';

import ActivityController from '../../../src/controllers/activityController';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('ActivityController', () => {
  const controller = new ActivityController();
  const params = {};

  describe('#list', () => {
    describe('valid case', () => {
      const validResponse = [{}];
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(ActivityModel, 'find', () => promise);
      });

      afterEach(() => {
        ActivityModel.find.restore();
      });

      it('resolves a promise', () => expect(controller.list(params)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(ActivityModel, 'find', () => promise);
      });

      afterEach(() => {
        ActivityModel.find.restore();
      });

      it('rejects a promise', () => expect(controller.list(params)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#get', () => {
    const locationId = 1;

    describe('valid case', () => {
      const validResponse = {};
      const promise = new Promise((resolve) => resolve(validResponse));

      beforeEach(() => {
        sinon.stub(ActivityModel, 'findOne', () => promise);
      });

      afterEach(() => {
        ActivityModel.findOne.restore();
      });

      it('resolves a promise', () => expect(controller.get(locationId)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(ActivityModel, 'findOne', () => promise);
      });

      afterEach(() => {
        ActivityModel.findOne.restore();
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
        sinon.stub(ActivityModel.prototype, 'save', () => promise);
      });

      afterEach(() => {
        ActivityModel.prototype.save.restore();
      });

      it('resolves a promise', () => expect(controller.save(data)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(ActivityModel.prototype, 'save', () => promise);
      });

      afterEach(() => {
        ActivityModel.prototype.save.restore();
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
        sinon.stub(ActivityModel, 'update', () => promise);
      });

      afterEach(() => {
        ActivityModel.update.restore();
      });

      it('resolves a promise', () => expect(controller.update(locationId, data)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(ActivityModel, 'update', () => promise);
      });

      afterEach(() => {
        ActivityModel.update.restore();
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
        sinon.stub(ActivityModel, 'remove', () => promise);
      });

      afterEach(() => {
        ActivityModel.remove.restore();
      });

      it('resolves a promise', () => expect(controller.delete(locationId)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';
      const promise = new Promise((_, reject) => reject(invalidResponse));

      beforeEach(() => {
        sinon.stub(ActivityModel, 'remove', () => promise);
      });

      afterEach(() => {
        ActivityModel.remove.restore();
      });

      it('rejects a promise', () => expect(controller.delete(locationId)).to.be.rejectedWith(invalidResponse));
    });
  });
});
