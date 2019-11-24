import express from 'express';

const router = express.Router();

router.post('/', (req, res) => res.status(200).json({ msg: 'it\'s works' }));

export default router;
