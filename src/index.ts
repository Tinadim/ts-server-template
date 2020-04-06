import 'module-alias/register';
import './config/env';
import { logger } from '@logger';
import { buildApp } from './config/app-setup';
import { connectToDatabase } from './config/database-setup';
import { startServer } from './config/http-server';

connectToDatabase()
    .then(() => {
        const app = buildApp();
        return startServer(app);
    })
    .tapCatch((error: any) => {
        logger.error('Error while bootstrapping application', error);
    });
