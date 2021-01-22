import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;
import { IUser, ErrorType } from '../types/types'; 

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstname: {type: String},
  lastname: {type: String}
},
{ 
  collection: 'users'
});

// Encrypt passwords in the model
const SALT_ROUNDS: number = 10;
userSchema.pre<IUser>('save', function(this: IUser ,next) {
  const user = this;
  // If no new user being created, skip this middleware
  if (!user.isModified('password')) {
    return next();
  };
  // Hash password
  bcrypt.hash(user.password, SALT_ROUNDS, function(error, hash) {
    // If there is an error hashing, log it
    if (error) return next(error);
    // Else set the password to the hash
    user.password = hash;
    return next();
  });
})

// Declare model for user
const User: Model<IUser> = mongoose.model('User', userSchema);
export default User;