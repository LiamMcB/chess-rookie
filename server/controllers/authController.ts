// Controllers for login and signup
import { NextFunction, Response } from 'express';
import { AuthControllerType, SignupUserRequest, LoginUserRequest, ErrorType } from '../types/types';
import User from '../models/userModels';
import bcrypt from 'bcrypt';
let authController: AuthControllerType = {};

// Login user based on credentials in request
authController.loginUser = (req: LoginUserRequest, res: Response, next: NextFunction): any => {
  // Get username and password from request body
  const username: string = req.body.username;
  const password: string = req.body.password;
  // Find user in the db
  User.findOne({username}, (error, user) => {
    // If there's an error, send back an error message
    if (error) {
      const errorObj: ErrorType = {
        status: 500,
        message: {err: 'Error in loginUser:' + error}
      };
      return next(errorObj);
    }
    // Compare the password with encrypted one
    bcrypt.compare(password, user.password, (err, result) => {
      // If error log it
      if (err) return next({
        status: 500,
        message: {err: 'Error in loginUser bcrypt compare:' + err}
      });
      // If the result is true, store user info in res.locals and move to next middleware
      if (result) {
        res.locals.user = user;
        return next();
      } else {
        // Password is incorrect
        res.status(400).json({message: 'The password is invalid.'});
      }
    });
  });
};

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