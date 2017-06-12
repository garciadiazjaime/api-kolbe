import express from 'express';

/*eslint-disable */
const router = express.Router();
/*eslint-enable */

router.get('/', (req, res) => {
  res.json({
    status: true,
    role: req.decoded.role,
    id: req.decoded.id,
  });
});

export default router;
