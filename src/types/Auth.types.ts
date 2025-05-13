import { Request } from 'express';

export interface IUserRequest extends Request {
    user?: any;
    t: (key: string, args?: { [key: string]: string }) => string;
}
