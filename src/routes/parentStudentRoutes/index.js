import express from 'express';
import ParentStudentController from '../../controllers/parentStudentController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new ParentStudentController();
const identiyId = 'parentId';

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
