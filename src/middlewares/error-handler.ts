import {Request, Response, NextFunction} from 'express';

export let lastError: Error | null = null;

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next : NextFunction
) => {
    console.log('Quelque chose ne va pas', err);

    lastError = err;

    res.status(400).send({
        message: 'Quelque chose ne va pas'
    });
}