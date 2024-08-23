// src/auth/auth.types.ts

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    username: string;
    rolename: string;
  };
}
