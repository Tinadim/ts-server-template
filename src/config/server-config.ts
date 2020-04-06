import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
    maxAge: 600,
};

export class ServerConfig {
    readonly port: number;

    constructor() {
        this.validateConfig();
        this.port = parseInt(process.env.PORT!, 10);
    }

    private validateConfig() {

    }

    getCorsOptions() {
        return corsOptions;
    }

    getDatabaseConnectionString() {
        return 'mongodb://localhost/cloud-server';
    }
}

export default new ServerConfig();
