import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    console.log('[SERVER]: Using .env file to supply config environment variables');
    dotenv.config({path: '.env'});
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is threated as 'dev'

export const SESSION_SECRET = process.env['SESSION_SECRET'];