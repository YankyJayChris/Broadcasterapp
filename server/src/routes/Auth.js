import express from 'express';

// redflag controller
import Users from '../controllers/Users';

// redflag middleware
import userValidator from '../validation/User';
import { uploadsingle } from '../helpers/upload';

const router = express.Router();

router.post('/', (req, res) => res.status(200).json({ msg: 'it\'s works' }));
router.post('/signup', uploadsingle, userValidator('signup', 'body'), Users.register);

export default router;