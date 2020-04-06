import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

const template = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
    level: 'debug',
    format: combine(
        format.colorize(),
        label({ label: 'ts-api-server-template' }),
        timestamp(),
        template,
    ),
    transports: [
        new transports.Console(),
    ],
});
