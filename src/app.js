import express from 'express';
import { json } from 'body-parser';
const axios = require('axios');

const app = express();

const signin = '/signin';
const signup = '/signup';
const signout = '/signout';
const currentUser = '/currentuser';

const authRoute = require('./routes/user');

app.use(json());

app.use(signin,authRoute);
app.use(signup,authRoute);
app.use(signout,authRoute);
app.use(currentUser,authRoute);

app.listen(3008, () => {
    console.log("Listening on port 3008!");
});