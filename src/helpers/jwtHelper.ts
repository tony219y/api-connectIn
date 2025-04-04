import jwt from 'jsonwebtoken';
import 'dotenv/config';


export const generateToken = (userId:string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    }
    catch (error) {
        throw new Error('Invalid token');
    }
};
