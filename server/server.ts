import * as express from 'express';
import * as path from 'path';

const PORT: number = 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});