import express from 'express';
import controller from '../controllers/Timesheet.ctr';

const router = express.Router();

// requests response to client
// router.put('/', controller.updateProfile);
router.post('/', controller.createTimesheet);
// router.post('/user', controller.getProfileData);

export = router;
