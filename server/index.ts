import express, { Request, Response } from 'express';
import connectDatabase from './src/mysql/mysql.init.js';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';
import validateEnv from './src/middleware/env.validation.js';
import disconnect from './src/mysql/mysql.config.js';

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
  let ret: boolean = false;
  try {
    while (!ret) {
      ret = await connectDatabase();
    }
    console.log('Connected to MySQL');
  } catch (error) {
    console.log('Error initializing MySQL:', error);
    process.exit(1);
  }

  app.listen(8001, () => {
    console.log('Server is listening...');
  });

  //routes

  
  //Disconnect if server is stopped with SIGINT or SIGTERM
  process.on('SIGINT', () => {
    disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    disconnect();
    process.exit(0);
  });
};

server().catch((error) => {
  console.error(error);
  process.exit(1);
});
