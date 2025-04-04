import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwtHelper";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        // console.log('decoded: ' ,decoded);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
}