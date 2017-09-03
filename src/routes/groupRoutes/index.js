import express from 'express';
import GroupController from '../../controllers/groupController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new GroupController();
const parentId = 'gradeId';
const identiyId = 'groupId';

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

router.post(`/:${identiyId}/upload`, (req, res) => {
  const { decoded } = req;
  const { _doc } = decoded;
  const { schoolId } = _doc;
  controller
    .upload(req.params[identiyId], req.files.data, schoolId)
    .then(data => {
      res.json({
        status: true,
        data,
      });
    })
    .catch(error => {
      res.json({
        status: false,
        error,
      });
    });
});

export default router;
