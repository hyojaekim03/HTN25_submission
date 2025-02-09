import express, { Request, Response } from 'express';
import usersRouter from './routes/users'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
  res.send('HTN25_BACKEND_TAKE_HOME_CHALLENGE');
});

app.use('/users', usersRouter);  // Use the /users route

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
