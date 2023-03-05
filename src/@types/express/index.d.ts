import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            userInfo: {
                id: number,
                admin: boolean
            }
        }
    }
}