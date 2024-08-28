// auth.types.ts

export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    username: string;
    rolename: string; // Use Role enum here
  };
}
