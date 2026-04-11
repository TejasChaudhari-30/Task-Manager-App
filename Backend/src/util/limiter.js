import express from "express";
import { rateLimit } from "express-rate-limit";


export const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    message: { error: 'Too many requests, please try again later.' },
    handler: (req, res, next, options) =>
        res.status(options.statusCode).json(options.message),
})
//for task fetching and operation
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100
});
