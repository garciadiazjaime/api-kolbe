import express from 'express';
import LocationController from '../../controllers/locationController';

/*eslint-disable */
const router = express.Router();
/*eslint-enable */
const controller = new LocationController();
const identiyId = 'locationId';

router.get('/', (req, res) => {
  controller
    .list()
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

router.get(`/:${identiyId}`, (req, res) => {
  controller
    .get(req.params.locationId)
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

router.post('/', (req, res) => {
  controller
    .save(req.body)
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

router.put(`/:${identiyId}`, (req, res) => {
  controller
    .update(req.params.locationId, req.body)
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

router.delete(`/:${identiyId}`, (req, res) => {
  controller
    .delete(req.params.locationId, req.body)
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

router.post(`/:${identiyId}/upload`, (req, res) => {
  controller
    .upload(req.params.locationId, req.files)
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
