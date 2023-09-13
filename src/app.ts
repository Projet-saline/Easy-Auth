import express from 'express';
import { json } from 'body-parser';

import { errorHandler } from './middlewares/error-handler';
import errorRoutes from './routes/errorRoutes';

const app = express();
app.use(json());

app.use(errorHandler);
app.use('/errors', errorRoutes);

app.listen(3009, () => {
    console.log("Easy-Auth listening on port 3009!");
});