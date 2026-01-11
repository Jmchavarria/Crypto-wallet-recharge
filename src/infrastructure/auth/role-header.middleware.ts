import type { NextFunction, Request, Response } from 'express';
import { UserRole } from '../../domain/enums/user-role.enum';

export function roleHeaderMiddleware(req: Request, _res: Response, next: NextFunction) {
  const roleHeader = String(req.headers['x-role'] ?? '').toLowerCase();

  // por defecto: READ_ONLY (más seguro)
  let role: UserRole = UserRole.READ_ONLY;

  if (roleHeader === 'admin') role = UserRole.ADMIN;
  if (roleHeader === 'read-only' || roleHeader === 'readonly') role = UserRole.READ_ONLY;

  // simulamos usuario autenticado
  (req as any).user = { role };

  next();
}
