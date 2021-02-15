/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";

export const enableCors = (req: Request, res: Response, next: () => void) => {
    // adds these headers to response object
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Origin', 'Content-Type, Authorization, Accept');

    next();
}