import * as dotenv from 'dotenv';
dotenv.config();
export const DatabaseConfiguration =
{
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10) || 3306,
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/../**/entities/*.entity.{ts,js}`],
    subscribers: [],
    migrationsRun: false
};

