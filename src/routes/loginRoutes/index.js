import express from 'express';

import LoginController from '../../controllers/loginController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new LoginController();

router.post('/', (req, res) => {
  controller.loginParent(req.body)
    .then((data) => {
      if (data) {
        res.json({ status: true, data });
      } else {
        res.json({ status: false });
      }
    })
    .catch(error => res.json({ status: false, error }));
});

export default router;
