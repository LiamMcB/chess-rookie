import express from 'express';
import bodyParser from 'body-parser';
import { ErrorType } from './types';
const router = require('./routes/routes');

const PORT: number = 3000;

const app = express();

// Parse request body
app.use(bodyParser.json());

// Route handler
app.use('/api', router);

// Handle failed routes
app.use((req, res) => {
  res.status(404).send('Route failed.');
});

// Catch-all error handler
app.use((err, req, res, next) => {
  const defaultErr: ErrorType = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred.' },
  };
  const errorObj: ErrorType = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Server listening on port 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
