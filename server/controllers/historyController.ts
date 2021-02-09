// Controller that updates history collection with new moves, sends moves to other player, etc
import { NextFunction, Request, Response } from 'express';
import History from '../models/historyModel';
import { NativeError } from 'mongoose';
import { HistoryControllerType } from '../types/types';
let historyController: HistoryControllerType = {};

// Gets invoked to start a game and send cookies to each user with game_id, DOES NOT add entry to db
historyController.startGame = (req: Request, res: Response, next: NextFunction): any => {
  // Get user 1's id, their side, and the username of who they will play against
}

// Controller that gets invoked after a user moves their piece
historyController.addMove = (req: Request, res: Response, next: NextFunction): any => {

}


export default historyController;