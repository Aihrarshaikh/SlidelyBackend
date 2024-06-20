import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

interface Error {
    status?: number;
    message?: string;
}

const logFilePath = path.join(__dirname, '../../logs/errors.log');

// Ensure the logs directory exists
if (!fs.existsSync(path.join(__dirname, '../../logs'))) {
    fs.mkdirSync(path.join(__dirname, '../../logs'));
}

const logErrorToFile = (message: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error('Failed to write to log file:', err);
    });
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error to the file
    logErrorToFile(`Error: ${message}, Status Code: ${status}`);

    res.status(status).json({ error: message });
};
