/* eslint max-len: [2, 500, 4] */
import fs from 'fs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MongoUtil from 'util-mongodb';
import sinon from 'sinon';

import UserModel from '../../../src/models/userModel';
import StudentModel from '../../../src/models/studentModel';
import GroupController from '../../../src/controllers/groupController';

const { expect } = chai;
chai.use(chaiAsPromised);

describe.only('GroupController', () => {
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

  describe.only('#upload', () => {
    const groupId = 1;

    describe('valid case', () => {
      beforeEach(() => {
        const user = {
          _id: '59a4ce7266ca3e5f71cf0b91',
          username: 'mloredo@siceaa.com',
          password: '621',
          role: 3,
          entityId: '598a59faf0fdc57c2674054d',
          schoolId: '598a59faf0fdc57c267405d5',
          updated: '2017-08-29T02:16:18.051Z',
          created: '2017-08-29T02:16:18.051Z',
          status: true,
        };
        const student = {
          _id: '59a6123064f7a9a14c53946f',
          groupId: '598a59faf0fdc57c2674054d',
          parentId: '59a4ce7266ca3e5f71cf0bb6',
          schoolId: '598a59faf0fdc57c267405d5',
          updated: '2017-08-30T01:17:36.522Z',
          created: '2017-08-30T01:17:36.521Z',
          status: true,
        };
        sinon.stub(UserModel, 'findOne', () => Promise.resolve(user));
        sinon.stub(UserModel.prototype, 'save', () => Promise.resolve());
        sinon.stub(StudentModel, 'findOne', () => Promise.resolve(student));
        sinon.stub(StudentModel.prototype, 'save', () => Promise.resolve());
      });

      afterEach(() => {
        UserModel.findOne.restore();
        UserModel.prototype.save.restore();
        StudentModel.findOne.restore();
        StudentModel.prototype.save.restore();
      });

      it('resolves returning success values', () => {
        const schoolId = 'schoolId';
        const promiseResults = controller.upload(groupId, {
          data: fs.readFileSync(`${process.env.PWD}/test/stub/LISTA_DE_ALUMNOS.xlsx`),
        }, schoolId);

        expect(promiseResults).to.eventually.deep.equal({ status: true, users: 45 });
      });
    });
  });
});
