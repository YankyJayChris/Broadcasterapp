import express from 'express';

// redflag controller
import Users from '../controllers/Users';

// redflag middleware
import userValidator from '../validation/User';
import { uploadsingle } from '../helpers/upload';
import jwtToken from '../helpers/jwtToken';

const router = express.Router();

router.post('/test', (req, res) => res.status(200).json({ msg: 'it\'s works' }));
router.post('/signup', uploadsingle, userValidator('signup', 'body'), Users.register);
router.post('/signin', userValidator('usersignin', 'body'), Users.signin);
router.get('/', jwtToken.verifyToken, Users.getAll);
router.get('/:id', jwtToken.verifyToken, userValidator('userID', 'params'), Users.getOne);
router.patch('/update/', uploadsingle, jwtToken.verifyToken, userValidator('userUpdate', 'body'), Users.update);
router.patch('/type/:id', jwtToken.verifyToken, userValidator('userID', 'params'), Users.updateUserRole);
router.delete('/:id', jwtToken.verifyToken, userValidator('userID', 'params'), Users.delete);


export default router;
