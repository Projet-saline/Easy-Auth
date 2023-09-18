import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();

// Config base de données distante :
// const sequelize = new Sequelize({
//     database: process.env.DB_NAME,
//     dialect: 'mysql',
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT) || 3306,
//     models: [
//         // __dirname + '/models'
//         User
//     ]
// });

// console.log({
//     database: process.env.DB_NAME,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT
// })

// Config base de données locale :
const sequelize = new Sequelize({
    database: process.env.DB_LOCAL_NAME,
    dialect: 'mysql',
    username: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASS,
    host: process.env.DB_LOCAL_HOST,
    port: Number(process.env.DB_LOCAL_PORT) || 8889,
    models: [
        // __dirname + '/models'
        User
    ]
});

// console.log({
//     database: process.env.DB_LOCAL_NAME,
//     username: process.env.DB_LOCAL_USER,
//     password: process.env.DB_LOCAL_PASS,
//     host: process.env.DB_LOCAL_HOST,
//     port: process.env.DB_LOCAL_PORT
// })

export default sequelize;