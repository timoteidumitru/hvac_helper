import express from 'express';
import controller from '../controllers/Timesheet.ctr';

const router = express.Router();

// requests response to client
router.put('/update', controller.updateTimesheetEntry);
router.post('/get', controller.getTimesheet);
router.post('/post', controller.postTimesheet);

export = router;
