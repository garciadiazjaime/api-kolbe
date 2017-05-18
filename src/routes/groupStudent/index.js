import express from 'express';
import GroupStudentController from '../../controllers/groupStudentController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new GroupStudentController();
const identiyId = 'groupId';

router.get('/', (req, res) => {
  controller
    .list(req.params[identiyId])
    .then(data => res.json({ status: true, data }))
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

export default router;
