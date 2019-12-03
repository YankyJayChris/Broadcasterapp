import express from 'express';

// redflag controller
// import RedFlags from '../controllers/RedFlags';

const router = express.Router();

router.post('/test', (req, res) => res.status(200).json({ msg: 'it\'s works' }));

export default router;
