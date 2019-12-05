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
router.get('/:id', jwtToken.verifyToken, redFlagValidator('redFlagID', 'params'), RedFlags.getOne);
router.patch('/:id', jwtToken.verifyToken, redFlagValidator('redFlagUpdate', 'body'), RedFlags.update);
router.patch('/status/:id', jwtToken.verifyToken, redFlagValidator('redFlagUpdate', 'body'), RedFlags.updateStatus);
router.delete('/:id', jwtToken.verifyToken, redFlagValidator('redFlagID', 'params'), RedFlags.delete);

export default router;
