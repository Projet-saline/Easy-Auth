import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import cookieSession from "cookie-session";
import https from 'https';
import fs from 'fs';

import { currentUserRouter } from './routes/current-userRoute';
import { signinRouter } from './routes/signinRoute';
import { signoutRouter } from './routes/signoutRoute';
import { signupRouter } from './routes/signupRoute';
import { userRouter } from './routes/userRoute';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

import database from "./config/database";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(urlencoded({ extended: true }));

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(userRouter);

// Route not found
app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

// Load environment variables
dotenv.config();

// Connection to database
database
    .sync()
    .then(() => console.log("Base de données connectée !!"))
    .catch(error => console.log(error));

// Start server
// app.listen(process.env.APP_PORT, () => {
//     console.log(`Server Gateway listen on port : ${process.env.APP_PORT} !!`);
// });

// Start server with HTTPS in local
https.createServer({
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem'),
}, app).listen(process.env.APP_PORT, () => {
    console.log(`Server Gateway listen on port : ${process.env.APP_PORT} !!`);
});