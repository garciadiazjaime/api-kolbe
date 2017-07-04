/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import express from 'express';
import jwt from 'jsonwebtoken';

import LoginController from '../../controllers/loginController';
import config from '../../config';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new LoginController();

router.post('/', (req, res) => {
  controller.login(req.body)
    .then((data) => {
      if (data) {
        // expires in 24 hours
        const token = jwt.sign(data, config.get('secureToken'), {
          expiresIn: 86400,
        });
        const id = data.role === 3 ? data._id : data.entityId;
        res.json({
          status: true,
          data: {
            token,
            role: data.role,
            id,
          },
        });
      } else {
        res.json({ status: false });
      }
    })
    .catch(error => res.json({ status: false, error }));
});

export default router;
