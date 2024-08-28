// Ensure you have the necessary types for Express
import { Request } from 'express';

interface RequestWithAuthHeader extends Request {
  headers: {
    authorization?: string; // Ensure this is typed correctly
    [key: string]: any; // Allow other headers
  };
}
