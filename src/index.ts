import express from 'express';
import usersRouter from './routes/users.router';
import scansRouter from './routes/scans.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// register router
app.use('/users', usersRouter);

app.use('/scans', scansRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
