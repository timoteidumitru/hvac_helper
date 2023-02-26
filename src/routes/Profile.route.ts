import express from 'express';
import controller from '../controllers/Profile.ctr';

const router = express.Router();

// requests response to client
router.put('/', controller.updateProfile);
router.post('/', controller.createProfile);
router.post('/user', controller.getProfileData);

export = router;
