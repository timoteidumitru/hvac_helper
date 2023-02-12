import express from 'express';
import controller from '../controllers/Profile.ctr';

const router = express.Router();

// requests response to client
router.post('/', controller.getProfileData);
router.post('/create', controller.createProfile);

export = router;
