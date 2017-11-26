import express from 'express';
import LocationController from '../../controllers/locationController';

const router = express.Router(); // eslint-disable-line
const controller = new LocationController();

router.post('/:locationId/upload', (req, res) => {
  const { decoded } = req;
  const { _doc } = decoded;
  const { schoolId } = _doc;
  controller
    .upload(schoolId, req.params.locationId, req.files.data)
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
