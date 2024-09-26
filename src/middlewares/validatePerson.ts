import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validaciones para la creación o actualización de personas
export const validatePerson = [
  body('firstName').notEmpty().withMessage('El nombre es requerido'),
  body('lastNameP').notEmpty().withMessage('El apellido paterno es requerido'),
  body('lastNameM').notEmpty().withMessage('El apellido materno es requerido'),
  body('address').notEmpty().withMessage('La dirección es requerida'),
  body('phone')
    .notEmpty().withMessage('El teléfono es requerido')
    .isNumeric().withMessage('El teléfono debe contener solo números')
    .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe contener exactamente 10 números'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];