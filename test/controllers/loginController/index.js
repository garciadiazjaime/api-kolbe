/* eslint max-len: [2, 500, 4] */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import UserModel from '../../../src/models/userModel';
import LoginController from '../../../src/controllers/loginController';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('LoginController', () => {
  const controller = new LoginController();

  describe('#login', () => {
    context('when promise resolves', () => {
      const user = 'user';

      beforeEach(() => {
        sinon.stub(UserModel, 'findOne', () => Promise.resolve(user));
      });

      afterEach(() => {
        UserModel.findOne.restore();
      });

      it('returns expected values', () => expect(controller.login({})).to.eventually.deep.equal(user));
    });

    context('when promise rejectes', () => {
      const error = 'error';

      beforeEach(() => {
        sinon.stub(UserModel, 'findOne', () => Promise.reject(error));
      });

      afterEach(() => {
        UserModel.findOne.restore();
      });

      it('returns expected values', () => expect(controller.login({})).to.be.rejectedWith(error));
    });
  });
});
