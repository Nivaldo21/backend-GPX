import { Request, Response, NextFunction } from 'express';

export const badRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 400 || err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message || 'Solicitud inválida',
      details: err.errors || null,
    });
  }
  next(err);
};