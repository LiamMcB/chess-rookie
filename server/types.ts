// Types for server files and api routes

// Type for errors in middleware
export interface ErrorType {
  log: string;
  status: number;
  message: ErrorMessageType;
};
interface ErrorMessageType {
  err: string; 
}