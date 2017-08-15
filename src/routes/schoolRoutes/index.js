import express from 'express';
import SchoolController from '../../controllers/schoolController';

/*eslint-disable */
const router = express.Router();
/*eslint-enable */
const controller = new SchoolController();

router.get(`/:schoolId`, (req, res) => {
  controller
    .get(req.params.schoolId)
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
