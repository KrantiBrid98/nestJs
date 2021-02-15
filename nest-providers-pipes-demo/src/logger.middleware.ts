/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class loggerMiddleWear implements NestMiddleware{
    // Request and response from express
    use(req: Request, res: Response, next: () => void) {
    //    console.log(res.header, req.header);
       next();
       // we can even send response from here and not from actual server (res.send)
       // next is important for flow to reach to actual db server
    }
}
