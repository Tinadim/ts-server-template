import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors';
import Router from 'express-promise-router';
import serverConfig from './server-config';
import { mount } from '../api';

export function buildApp() {
    const app = express();
    setupMiddleware(app);
    bootEndpoints(app);
    return app;
}

function setupMiddleware(app: Application) {
    const corsOptions = serverConfig.getCorsOptions();

    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

function bootEndpoints(app: Application) {
    const router = Router();
    mount(router);
    app.use('/', router);
}
