import { createConnection } from 'mysql2';
import { database as databaseConfig } from './config';

export default createConnection(databaseConfig).promise();
