// Controllers for login and signup
import { NextFunction, Response } from 'express';
import { AuthControllerType, SignupUserRequest, LoginUserRequest, ErrorType, IUser, TokenData, DataStoredInToken, RequestWithUser } from '../types/types';
import User from '../models/userModels';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
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
        // Create token for newly logged in user
        const tokenData: TokenData = authController.createToken(user);
        // Set cookie for user
        res.cookie('Authorization', tokenData.token, {httpOnly: true, maxAge: tokenData.expiresIn});
        return next();
      } else {
        // Password is incorrect
        res.status(400).json({message: 'The password is invalid.'});
      }
    });
  });
};

// Signup controller to signup new user
authController.signupUser = async (req: SignupUserRequest, res: Response, next: NextFunction): Promise<any> => {
  // Get username, password, first, and lastname from user
  const username: string = req.body.username; 
  const password: string = req.body.password;
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
  // See if username exists in db, if it does, inform user that the username is taken
  if (await User.findOne({username})) return res.status(400).json({message: 'That username is taken'});
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
    // Create token for newly signed up user
    const tokenData: TokenData = authController.createToken(user);
    // Set cookie for user
    res.cookie('Authorization', tokenData.token, {httpOnly: true, maxAge: tokenData.expiresIn});
    return next();
  });
}

// Function to create jwt for user
authController.createToken = function(user: IUser): TokenData {
  // Expires in 1 hour
  const expiresIn = 3600;
  // Get secret from env
  const secret: string = process.env.JWT_SECRET;
  // Initialize data stored in token
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id
  }
  // Return the newly created token 
  return {
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    expiresIn
  }
}

// Function to verify user based on their cookies => will be used when users try to see their history or play against others
authController.verifyUser = async function(req: RequestWithUser, res: Response, next: NextFunction) {
  // Get cookies from request
  const cookies = req.cookies; 
  // If there are cookies and user has been authorized
  if (cookies && cookies.Authorization) {
    // Get secret from process.env
    const secret = process.env.JWT_SECRET;
    // Get verification from jwt 
    const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
    // Find user with this id
    const user = await User.findById(verificationResponse._id);
    // If the user exists, put it on the request and move to next
    if (user) {
      // Put this user on res.locals, so other middleware has access to it
      res.locals.user = user;
    } else {
      // Notify the user that they have an invalid token
      res.status(401).json({message: 'Invalid token. You do not have access.'})
    }
  } else {
    // If no cookies, notify user they arent logged in
    res.status(400).json({message: 'You are not logged in.'})
  }
}

// Function to logout user and remove cookies
authController.logoutUser = function(req: Request, res: Response, next: NextFunction) {
  // Set cookies back to default
  res.cookie('Authorization', '', {httpOnly: true, maxAge: 0});
  // Return next
  return next();
}

export default authController; 