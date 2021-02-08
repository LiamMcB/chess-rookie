import mongoose, { Schema, Model } from 'mongoose';
import { IHistory } from '../types/types';

// Structure of history entries
const historySchema = new Schema({
  game_id: {type: Number, required: true, unique: true},
  white_id: {type: String, required: true},
  black_id: {type: String, required: true},
  move: {type: String},
  move_number: {type: String}
},
{
  collection: 'history'
});

// Declare model for history collection
const History: Model<IHistory> = mongoose.model('History', historySchema);
export default History;