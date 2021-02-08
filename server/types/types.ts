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
  createToken?: any;
  verifyUser?: any;
  logoutUser?: any;
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

// Type for request when verifying user's cookies => has user so it can be seen in requests, but changed to put it on res.locals
export interface RequestWithUser extends Request {
  user: IUser;
}

// Type for user in user model
export interface IUser extends Document {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
};

// Types for JWT tokens
export interface TokenData {
  token: string;
  expiresIn: number;
}
export interface DataStoredInToken {
  _id: string;
}

// Type for history entry in history model
export interface IHistory extends Document {
  game_id: number;
  white_id: string; // _id from user on each side, BOT if user playing against bot
  black_id: string;
  move: string; // ie Nf6, meaning night moving to f6
  move_number: number; // for order of moves
}