import jwt from 'jsonwebtoken';
import express from 'express';
import type { JwtPayload } from "jsonwebtoken";

const JWTSECRET = process.env.JWT_SECRET ?? ""
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: "Authenticate using a valid token" });
        }
        const data = jwt.verify(token, JWTSECRET) as JwtPayload & { user: any };
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "Authenticate using a valid token" });
    }
}

export default authMiddleware