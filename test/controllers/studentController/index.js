/* eslint max-len: [2, 500, 4] */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import StudentModel from '../../../src/models/studentModel';
import UserModel from '../../../src/models/userModel';
import StudentController from '../../../src/controllers/studentController';

const { expect } = chai;
chai.use(chaiAsPromised);


describe('StudentController', () => {
  const controller = new StudentController();

  describe('#list', () => {
    describe('valid case', () => {
      const validResponse = [{}];

      beforeEach(() => {
        sinon.stub(StudentModel, 'find', () => Promise.resolve(validResponse));
        sinon.stub(UserModel, 'findOne', () => Promise.resolve({}));
      });

      afterEach(() => {
        StudentModel.find.restore();
        UserModel.findOne.restore();
      });

      it('resolves a promise', () => expect(controller.list()).to.eventually.deep.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';

      beforeEach(() => {
        sinon.stub(StudentModel, 'find', () => Promise.reject(invalidResponse));
      });

      afterEach(() => {
        StudentModel.find.restore();
      });

      it('rejects a promise', () => expect(controller.list()).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#save', () => {
    const data = {};

    describe('valid case', () => {
      const validResponse = {};

      beforeEach(() => {
        sinon.stub(StudentModel, 'findOne', () => Promise.resolve(null));
        sinon.stub(StudentModel.prototype, 'save', () => Promise.resolve(validResponse));
      });

      afterEach(() => {
        StudentModel.findOne.restore();
        StudentModel.prototype.save.restore();
      });

      it('resolves a promise', () => expect(controller.save(data)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';

      beforeEach(() => {
        sinon.stub(StudentModel, 'findOne', () => Promise.resolve(null));
        sinon.stub(StudentModel.prototype, 'save', () => Promise.reject(invalidResponse));
      });

      afterEach(() => {
        StudentModel.findOne.restore();
        StudentModel.prototype.save.restore();
      });

      it('rejects a promise', () => expect(controller.save(data)).to.be.rejectedWith(invalidResponse));
    });
  });

  describe('#delete', () => {
    const groupId = 'groupId';
    const parentId = 'parentId';

    describe('valid case', () => {
      const validResponse = true;

      beforeEach(() => {
        sinon.stub(StudentModel, 'remove', () => Promise.resolve());
        sinon.stub(StudentModel, 'find', () => Promise.resolve([]));
        sinon.stub(UserModel, 'remove', () => Promise.resolve(validResponse));
      });

      afterEach(() => {
        StudentModel.remove.restore();
        StudentModel.find.restore();
        UserModel.remove.restore();
      });

      it('resolves a promise', () => expect(controller.delete(groupId, parentId)).to.eventually.equal(validResponse));
    });

    describe('invalid case', () => {
      const invalidResponse = 'error';

      beforeEach(() => {
        sinon.stub(StudentModel, 'remove', () => Promise.reject(invalidResponse));
      });

      afterEach(() => {
        StudentModel.remove.restore();
      });

      it('rejects a promise', () => expect(controller.delete(groupId, parentId)).to.be.rejectedWith(invalidResponse));
    });
  });
});
