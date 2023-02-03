import express from 'express';
import controller from '../controllers/Users.ctr';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

// requests response to client
router.post('/create', ValidateJoi(Schemas.user.create), controller.createUser);
// router.get('/get', controller.getAllUsers);

export = router;
