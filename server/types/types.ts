// Types for server files and api routes
import { NextFunction, RequestHandler, Request } from "express";
import { Document } from 'mongoose';

// Type for errors in middleware
export interface ErrorType {
  log?: string;
  status: number;
  message: ErrorMessageType;
};
interface ErrorMessageType {
  err: string; 
}

// Type for authentication controller
export interface AuthControllerType {
  loginUser?:  any;
  signupUser?: any;
}

// Types for request body of signing up user
export interface SignupUserRequest extends Request {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

// Types for request body of logging in a user
export interface LoginUserRequest extends Request {
  username: string;
  password: string;
}

// Type for user in user model
export interface IUser extends Document {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
};