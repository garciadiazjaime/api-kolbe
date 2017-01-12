import express from 'express';
import GradeController from '../../controllers/gradeController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new GradeController();
const parentId = 'periodId';
const identiyId = 'gradeId';

router.get('/', (req, res) => {
  controller
    .list(req.params[parentId])
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

router.get(`/:${identiyId}`, (req, res) => {
  controller
    .get(req.params[identiyId])
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

router.post('/', (req, res) => {
  controller
    .save(req.params[parentId], req.body)
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

router.put(`/:${identiyId}`, (req, res) => {
  controller
    .update(req.params[identiyId], req.body)
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

router.delete(`/:${identiyId}`, (req, res) => {
  controller
    .delete(req.params[identiyId], req.body)
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
