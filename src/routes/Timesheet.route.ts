import express from 'express';
import controller from '../controllers/Timesheet.ctr';

const router = express.Router();

// requests response to client
router.delete('/delete', controller.deleteTimesheetEntry);
router.post('/get-data', controller.getTimesheet);
router.put('/update-day', controller.updateTimesheet);
router.put('/add-day', controller.pushTodayTimesheet);
router.post('/create', controller.createTimesheet);

export = router;
