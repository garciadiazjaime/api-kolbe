/* eslint max-len: [2, 500, 4] */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import UserModel from '../../../src/models/userModel';
import UserController from '../../../src/controllers/userController';

const { expect } = chai;
chai.use(chaiAsPromised);


describe('UserController', () => {
  const controller = new UserController();

  describe('#get', () => {
    describe('valid case', () => {
      const validResponse = 'validResponse';

      beforeEach(() => {
        sinon.stub(UserModel, 'findOne', () => Promise.resolve(validResponse));
      });

      afterEach(() => {
        UserModel.findOne.restore();
      });

      it('returns expected values', () => expect(controller.get()).to.eventually.deep.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';

      beforeEach(() => {
        sinon.stub(UserModel, 'findOne', () => Promise.reject(invalidResponse));
      });

      afterEach(() => {
        UserModel.findOne.restore();
      });

      it('rejects a promise', () => expect(controller.get()).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#save', () => {
    const data = {};

    describe('valid case', () => {
      const validResponse = {};

      beforeEach(() => {
        sinon.stub(UserModel, 'findOne', () => Promise.resolve(null));
        sinon.stub(UserModel.prototype, 'save', () => Promise.resolve(validResponse));
      });

      afterEach(() => {
        UserModel.findOne.restore();
        UserModel.prototype.save.restore();
      });

      it('resolves a promise', () => expect(controller.save(data)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';

      beforeEach(() => {
        sinon.stub(UserModel, 'findOne', () => Promise.resolve(null));
        sinon.stub(UserModel.prototype, 'save', () => Promise.reject(invalidResponse));
      });

      afterEach(() => {
        UserModel.findOne.restore();
        UserModel.prototype.save.restore();
      });

      it('rejects a promise', () => expect(controller.save(data)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#delete', () => {
    const userId = 'userId';

    describe('valid case', () => {
      const validResponse = true;

      beforeEach(() => {
        sinon.stub(UserModel, 'remove', () => Promise.resolve(validResponse));
      });

      afterEach(() => {
        UserModel.remove.restore();
      });

      it('resolves a promise', () => expect(controller.delete(userId)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';

      beforeEach(() => {
        sinon.stub(UserModel, 'remove', () => Promise.reject(invalidResponse));
      });

      afterEach(() => {
        UserModel.remove.restore();
      });

      it('rejects a promise', () => expect(controller.delete(userId)).to.be.rejectedWith(invalidResponse));
    });
  });
});
