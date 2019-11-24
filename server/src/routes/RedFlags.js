import express from 'express';

// redflag controller
import RedFlags from '../controllers/RedFlags';

// redflag middleware
import jwtToken from '../helpers/jwtToken';
import redFlagValidator from '../validation/RedFlag';
import { uploadFiles } from '../helpers/upload';

const router = express.Router();

router.post('/test', (req, res) => res.status(200).json({ msg: 'it\'s works' }));
router.get('/', jwtToken.verifyToken, RedFlags.getAll);
router.post('/', jwtToken.verifyToken, uploadFiles, redFlagValidator('redFlagPost', 'body'), RedFlags.create);

export default router;
