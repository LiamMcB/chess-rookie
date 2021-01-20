import * as express from 'express';
import authController from '../controllers/authController';

// Get router from express
const router = express.Router();

// Login router 
router.post('/login', authController.loginUser, (req, res, next) => {
  res.status(200).json();
});

// Signup router
router.post('/signup', authController.signupUser, (req, res, next) => {
  res.status(200).json();
});

module.exports = router;