import express from 'express';
import jwt from 'jsonwebtoken';

import sessionRoutes from '../sessionRoutes';
import schoolRoutes from '../schoolRoutes';
import locationRoutes from '../locationRoutes';
import levelRoutes from '../levelRoutes';
import gradeRoutes from '../gradeRoutes';
import groupRoutes from '../groupRoutes';
import studentRoutes from '../studentRoutes';
import groupStudentRoutes from '../groupStudent';
import parentStudentRoutes from '../parentStudentRoutes';
import parentGroupRoutes from '../parentGroupRoutes';
import newsletterRoutes from '../newsletterRoutes';
import documentRoutes from '../documentRoutes';
import activityRoutes from '../activityRoutes';
import parentRoutes from '../parentRoutes';
import groupParentRoutes from '../groupParentRoutes';
import loginRoutes from '../loginRoutes';

import config from '../../config';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */

router.use('/login', loginRoutes);

router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.get('secureToken'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      /*eslint-disable */
      req.decoded = decoded;
      /*eslint-enable */
      next();
      return null;
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
  return null;
});

router.use('/session', sessionRoutes);
router.use('/school', schoolRoutes);
router.use('/location', locationRoutes);

router.use('/newsletter', newsletterRoutes);
router.use('/document', documentRoutes);
router.use('/activity', activityRoutes);
router.use('/parent', parentRoutes);
router.use('/student', studentRoutes);

router.use('/parent/:parentId/student', parentStudentRoutes);
router.use('/parent/:parentId/group', parentGroupRoutes);

router.use('/group/:groupId/activity', activityRoutes);
router.use('/group/:groupId/document', documentRoutes);
router.use('/group/:groupId/newsletter', newsletterRoutes);
router.use('/group/:groupId/parent', groupParentRoutes);
router.use('/group/:groupId/student', groupStudentRoutes);
router.use('/group', groupRoutes);


locationRoutes.use('/:locationId/level', levelRoutes);
levelRoutes.use('/:levelId/grade', gradeRoutes);
gradeRoutes.use('/:gradeId/group', groupRoutes);
groupRoutes.use('/:groupId/student', studentRoutes);
groupRoutes.use('/:groupId/parent', parentRoutes);

export default router;
