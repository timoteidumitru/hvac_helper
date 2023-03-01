import express from 'express';
import controller from '../controllers/Timesheet.ctr';

const router = express.Router();

// requests response to client
router.put('/update', controller.updateTimesheet);
router.put('/add-day', controller.pushTimesheet);
router.post('/create', controller.createTimesheet);

export = router;
