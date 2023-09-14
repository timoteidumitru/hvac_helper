import express from 'express';
import controller from '../controllers/Timesheet.ctr';

const router = express.Router();

// requests response to client
router.post('/new-timesheet', controller.newTimesheet);

export = router;
