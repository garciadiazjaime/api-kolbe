/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import express from 'express';

/*eslint-disable */
const router = express.Router();
/*eslint-enable */

router.get('/', (req, res) => {
  const { decoded } = req;
  const id = decoded.role === 3 ? decoded._id : decoded.entityId;
  const response = {
    status: true,
    role: decoded.role,
    id,
  };
  res.json(response);
});

export default router;
