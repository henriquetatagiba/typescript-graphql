import * as express from 'express';

const router = express.Router();

router.all('/', (req, res) => {
  return res.status(200).json({ msg: 'CTG Assistencia Service' });
});

export default router;
