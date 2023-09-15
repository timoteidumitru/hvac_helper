import express from 'express';
import controller from '../controllers/Timesheet.ctr';

const router = express.Router();

// requests response to client
router.get('/get', controller.getTimesheet);
router.post('/new', controller.newTimesheet);

export = router;
