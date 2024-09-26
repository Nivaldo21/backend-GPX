import { Request, Response, NextFunction } from 'express';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const numericId = Number(id);
  if (isNaN(numericId) || numericId <= 0) {
    return res.status(400).json({ message: 'ID inválido, debe ser un número positivo' });
  }
  next();
};
