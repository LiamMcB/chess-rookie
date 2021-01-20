// Types for server files and api routes
import { NextFunction, RequestHandler } from "express";

// Type for errors in middleware
export interface ErrorType {
  log: string;
  status: number;
  message: ErrorMessageType;
};
interface ErrorMessageType {
  err: string; 
}

// Type for authentication controller
export interface AuthControllerType {
  loginUser: any;
  signupUser: any;
}