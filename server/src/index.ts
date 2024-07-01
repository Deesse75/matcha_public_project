import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';
import validateEnv from './middleware/env.validation.js';
import disconnect, { initializeDatabase } from './mysql/mysql.config.js';
import { appRouter } from './app/app.route.js';
import authRouter from './auth/auth.route.js';
import userRouter from './user/user.route.js';

const server = async () => {
  const app = express();
  app.use(express.json());

  //configur environment variables
  dotenv.config();
  if (!fs.existsSync('./.env')) {
    console.log('Please create a .env file');
    process.exit(1);
  }
  if (!validateEnv()) {
    console.error('Missing environment variables. Please refer to env.sample');
    process.exit(1);
  }

  //cors
  const domains = process.env.DOMAINS_CORS;
  const corsOptions = {
    origin: domains,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.use(cors(corsOptions));

  //connect to database
  try {
    if (!(await initializeDatabase()))
      console.log('Error while initializing MySQL');
    else console.log('Connected to MySQL');
  } catch (error) {
    console.log('Error while initializing MySQL: ', error);
    process.exit(1);
  }

  app.listen(8001, () => {
    console.log('Server is listening...');
  });

  //routes
  app.use('/app', appRouter);
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  // app.use('/display', displayRouter);
  app.use('/*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
  });

  //Disconnect if server is stopped with SIGINT or SIGTERM
  process.on('SIGINT', () => {
    try {
      disconnect();
      console.log('MySQL was disconnected');
    } catch (error) {
      console.error('MySQL was not properly disconnected: ', error);
      process.exit(1);
    }
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    try {
      disconnect();
      console.log('MySQL was disconnected');
    } catch (error) {
      console.error('MySQL was not properly disconnected: ', error);
      process.exit(1);
    }
    process.exit(0);
  });
};

server().catch((error) => {
  console.error('Error server: ', error);
  process.exit(1);
});
