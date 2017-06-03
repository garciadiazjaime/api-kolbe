import express from 'express';
import ParentGroupController from '../../controllers/parentGroupController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new ParentGroupController();
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
