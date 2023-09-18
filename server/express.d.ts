import { User } from './src/models/Users.model';

// express.d.ts
declare module 'express-serve-static-core' {
  interface Request {
    user: typeof User;
  }
}
