import type { NextFunction, Request, Response } from 'express';
import type { PrismaService } from '../database/prisma.service';

export function userHeaderMiddleware(prisma: PrismaService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = String(req.headers['x-user-id'] ?? '').trim();

    if (!userId) {
      return res.status(401).json({ message: 'Missing x-user-id header' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    (req as any).user = { id: user.id, role: user.role };
    next();
  };
}
