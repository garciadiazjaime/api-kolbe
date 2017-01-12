import express from 'express';
import LocationController from '../../controllers/locationController';

/*eslint-disable */
const router = express.Router();
/*eslint-enable */
const locationController = new LocationController();

router.get('/', (req, res) => {
  locationController
    .list()
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

router.get('/:locationId', (req, res) => {
  locationController
    .get(req.params.locationId)
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
  locationController
    .save(req.body)
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

router.put('/:locationId', (req, res) => {
  locationController
    .update(req.params.locationId, req.body)
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

router.delete('/:locationId', (req, res) => {
  locationController
    .delete(req.params.locationId, req.body)
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
