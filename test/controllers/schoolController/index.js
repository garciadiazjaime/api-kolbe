/* eslint max-len: [2, 500, 4] */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import SchoolModel from '../../../src/models/schoolModel';
import SchoolController from '../../../src/controllers/schoolController';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('SchoolController', () => {
  const controller = new SchoolController();

  describe('#get', () => {
    context('when promise resolves', () => {
      const school = 'school';

      beforeEach(() => {
        sinon.stub(SchoolModel, 'findOne', () => Promise.resolve(school));
      });

      afterEach(() => {
        SchoolModel.findOne.restore();
      });

      it('returns expected values', () => expect(controller.get()).to.eventually.deep.equal(school));
    });

    context('when promise rejectes', () => {
      const error = 'error';

      beforeEach(() => {
        sinon.stub(SchoolModel, 'findOne', () => Promise.reject(error));
      });

      afterEach(() => {
        SchoolModel.findOne.restore();
      });

      it('returns expected values', () => expect(controller.get()).to.be.rejectedWith(error));
    });
  });
});
