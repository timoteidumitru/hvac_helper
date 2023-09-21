import express from 'express';
import controller from '../controllers/Profile.ctr';

const router = express.Router();

// requests response to client
router.get('/get', controller.getProfile);
router.put('/update', controller.updateProfile);
router.post('/register', controller.createProfile);

export = router;
