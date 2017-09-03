import express from 'express';
import StudentController from '../../controllers/studentController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new StudentController();

router.get('/', (req, res) => {
  controller
    .list(req.params.groupId)
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

router.delete('/:parentId', (req, res) => {
  controller
    .delete(req.params.groupId, req.params.parentId)
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

export default router;
