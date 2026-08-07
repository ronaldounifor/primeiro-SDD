import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'E_VALIDATION',
        message: 'Validation failed',
        details: err.flatten().fieldErrors
      }
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({
      error: {
        code: 'E_INTERNAL',
        message: err.message
      }
    });
    return;
  }

  res.status(500).json({
    error: {
      code: 'E_INTERNAL',
      message: 'Unexpected error'
    }
  });
}
