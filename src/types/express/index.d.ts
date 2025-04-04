import 'express';

declare global {
  namespace Express {
    interface Request {
      user: any; // หรือกำหนด type ที่เฉพาะเจาะจงกว่านี้
    }
  }
}