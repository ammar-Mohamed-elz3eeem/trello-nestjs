import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class IsLoggedInMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    if (!req.cookies) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    const authKey = req.cookies['authKey'];
    if (!authKey) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    console.log('authKey from checking login middleware', authKey);
    next();
  }
}
