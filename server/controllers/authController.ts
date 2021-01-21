// Controllers for login and signup
import { NextFunction, Response } from 'express';
import { AuthControllerType, SignupUserRequest, ErrorType } from '../types/types';
import User from '../models/userModels';
let authController: AuthControllerType = {};

// Login user based on credentials in request
authController.loginUser = (req: Request, res: Response, next: NextFunction): any => {
  return next();
}

// Signup controller to signup new user
authController.signupUser = (req: SignupUserRequest, res: Response, next: NextFunction): any => {
  // Get username, password, first, and lastname from user
  const username: string = req.body.username; 
  const password: string = req.body.password;
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
  // Create a new user with a document in users
  User.create({username, password, firstname, lastname}, (error, user) => {
    // If there's an error, send back an error message
    if (error) {
      const errorObj: ErrorType = {
        status: 500,
        message: {err: 'Error in signupUser:' + error}
      };
      return next(errorObj);
    }
    // Store user info in res.locals and move to next middleware
    res.locals.user = user;
    return next();
  });
}

export default authController; 