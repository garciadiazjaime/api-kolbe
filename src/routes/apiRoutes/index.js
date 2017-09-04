import express from 'express';
import jwt from 'jsonwebtoken';

import sessionRoutes from '../sessionRoutes';
import schoolRoutes from '../schoolRoutes';
import groupRoutes from '../groupRoutes';
import studentRoutes from '../studentRoutes';
import newsletterRoutes from '../newsletterRoutes';
import documentRoutes from '../documentRoutes';
import activityRoutes from '../activityRoutes';
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

router.use('/parent/:parentId/group', groupRoutes);

router.use('/group/:groupId/activity', activityRoutes);
router.use('/group/:groupId/document', documentRoutes);
router.use('/group/:groupId/newsletter', newsletterRoutes);
router.use('/group/:groupId/parent', studentRoutes);
router.use('/group', groupRoutes);

export default router;
