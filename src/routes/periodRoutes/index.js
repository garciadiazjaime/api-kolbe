import express from 'express';
import PeriodController from '../../controllers/periodController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const periodController = new PeriodController();

router.get('/', (req, res) => {
  periodController
    .list(req.params.locationId)
    .then((results) => {
      res.json({
        status: true,
        data: results,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        data: error,
      });
    });
});

router.get('/:periodId', (req, res) => {
  periodController
    .get(req.params.periodId)
    .then((results) => {
      res.json({
        status: true,
        data: results,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        data: error,
      });
    });
});

router.post('/', (req, res) => {
  periodController
    .save(req.params.locationId, req.body)
    .then((results) => {
      res.json({
        status: true,
        data: results,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        data: error,
      });
    });
});

router.put('/:periodId', (req, res) => {
  periodController
    .update(req.params.periodId, req.body)
    .then((results) => {
      res.json({
        status: true,
        data: results,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        data: error,
      });
    });
});

router.delete('/:periodId', (req, res) => {
  periodController
    .delete(req.params.periodId, req.body)
    .then((results) => {
      res.json({
        status: true,
        data: results,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        data: error,
      });
    });
});

export default router;
