// Controllers for login and signup
import { NextFunction } from 'express';
import { AuthControllerType } from '../types';
let authController: AuthControllerType = {};

// Login user based on credentials in request
authController.loginUser = (req: Request, res: Response, next: NextFunction): any => {
  return next();
}

// Signup controller to signup new user
authController.signupUser = (req: Request, res: Response, next: NextFunction): any => {
  return next();
}

export default authController; 