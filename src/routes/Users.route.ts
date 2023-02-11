import express from 'express';
import controller from '../controllers/Users.ctr';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

// requests response to client
router.post('/login', ValidateJoi(Schemas.user.validate), controller.loginUser);
router.post('/register', ValidateJoi(Schemas.user.create), controller.createUser);

export = router;
