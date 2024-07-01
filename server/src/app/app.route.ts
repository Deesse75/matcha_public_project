import { Router } from 'express';
import { initializeApp } from './app.controller.js';

export const appRouter = Router();

appRouter.get('/init', initializeApp);
