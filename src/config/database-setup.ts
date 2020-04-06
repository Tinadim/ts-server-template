import Bluebird from 'bluebird';
import mongoose from 'mongoose';
import { logger } from '@logger';
import serverConfig from './server-config';

mongoose.Promise = Bluebird;

export function connectToDatabase(): Bluebird<void> {
    const db = mongoose.connection;

    return mongoose.connect(serverConfig.getDatabaseConnectionString(), { useNewUrlParser: true })
        .tap(() => {
            logger.info('Successfully connected to the database');
        })
        .then(() => {
            db.on('error', onError);
            db.on('disconnected', onDisconnected);
        })
        .catch((error: any) => {
            logger.error('Unable to connect to the database', error);
            onError(error);
        });
}

function onError(error: any) {
    logger.error('Database error:', error);
    killProcess();
}

function onDisconnected() {
    logger.error('Database disconnected');
    killProcess();
}

function killProcess() {
    logger.error('Killing the process...');
    process.exit(1);
}
