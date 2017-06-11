import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
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

export default router;
