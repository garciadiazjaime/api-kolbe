/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import express from 'express';

/*eslint-disable */
const router = express.Router();
/*eslint-enable */

router.get('/', (req, res) => {
  const { decoded } = req;
  const { _doc } = decoded;
  const entityId = _doc.role === 3 ? _doc._id : _doc.entityId;
  const response = {
    status: true,
    role: _doc.role,
    schoolId: _doc.schoolId,
    entityId,
  };
  res.json(response);
});

export default router;
