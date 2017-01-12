import express from 'express';
import LocationController from '../../controllers/locationController';

/*eslint-disable */
const router = express.Router();
/*eslint-enable */
const locationController = new LocationController();

router.get('/', (req, res) => {
  locationController
    .list()
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

router.get('/:locationId', (req, res) => {
  locationController
    .get(req && req.params ? req.params.locationId : null)
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
  locationController
    .save(req.body)
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

router.put('/:locationId', (req, res) => {
  locationController
    .update(req.params.locationId, req.body)
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

router.delete('/:locationId', (req, res) => {
  locationController
    .delete(req.params.locationId, req.body)
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
