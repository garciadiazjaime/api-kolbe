/* eslint max-len: [2, 500, 4] */
import fs from 'fs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import UserModel from '../../../src/models/userModel';
import StudentModel from '../../../src/models/studentModel';
import SchoolModel from '../../../src/models/schoolModel';
import LocationController from '../../../src/controllers/locationController';

const locations = require('../../stub/locations.json');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('LocationController', () => {
  const controller = new LocationController();

  describe('#upload', () => {
    const groupId = 1;

    context('when user and student are found', () => {
      describe('no new data is created', () => {
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

          sinon.stub(UserModel, 'findOne', () => Promise.resolve(null));
          sinon.stub(UserModel.prototype, 'save', () => Promise.resolve(user));
          sinon.stub(SchoolModel, 'find', () => Promise.resolve(locations));
          sinon.stub(StudentModel, 'findOne', () => Promise.resolve(null));
          sinon.stub(StudentModel.prototype, 'save', () => Promise.resolve(student));
        });

        afterEach(() => {
          UserModel.findOne.restore();
          StudentModel.findOne.restore();
          StudentModel.prototype.save.restore();
          UserModel.prototype.save.restore();
          SchoolModel.find.restore();
        });

        it('returns expected values', (done) => {
          const schoolId = 'schoolId';
          const promiseResults = controller.upload(schoolId, groupId, {
            data: fs.readFileSync(`${process.env.PWD}/test/stub/LISTA_DE_ALUMNOS-HEADER2.xlsx`),
          });

          promiseResults
            .then((results) => {
              expect(results.length).to.equal(367);
            })
            .catch(() => {
              expect(false).to.be(true);
            })
            .then(done);
        });
      });
    });
  });
});
