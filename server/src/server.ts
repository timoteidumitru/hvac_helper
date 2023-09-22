import express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import userRoutes from './routes/User.route';
import profileRoutes from './routes/Profile.route';
import timesheetRoutes from './routes/Timesheet.route';

const router = express();
// Connect to Mongo
mongoose.set('strictQuery', true);
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('MongoDB connected successfully.');
    StartServer();
  })
  .catch((error) => Logging.error(error));

// Only Start Server if Mongoose Connects
const StartServer = () => {
  // Log the request
  router.use((req, res, next) => {
    // Log the req
    Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      // Log the res
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  // middlewhere
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  // Serve static assets (e.g., CSS, JS, images)
  router.use(express.static(path.join(__dirname, 'public')));

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // allow requests from any domain
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  // Routes
  router.use('/user', userRoutes);
  router.use('/profile', profileRoutes);
  router.use('/timesheet', timesheetRoutes);

  // Serve the main HTML file for all routes
  router.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Healthcheck */
  router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'is alive..' }));

  // Error handling
  router.use((req, res, next) => {
    const error = new Error('Route not found.');

    Logging.error(error);

    res.status(404).json({
      message: error.message
    });
  });

  // Server starts
  http
    .createServer(router)
    .listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
