import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstname: {type: String},
  lastname: {type: String}
},
{ 
  collection: 'users'
});

export default mongoose.model('User', userSchema);