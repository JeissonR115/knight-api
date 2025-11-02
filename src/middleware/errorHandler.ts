import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message
    });
  }

  // Para errores de tsoa/validación
  if (error.name === 'ValidateError') {
    return res.status(422).json({
      error: 'Validation Failed',
      details: JSON.parse(error.message)
    });
  }

  // Error por defecto
  console.error('Error:', error);
  return res.status(500).json({
    error: 'Internal Server Error'
  });
};