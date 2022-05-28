import express, { Request, Response, Router } from 'express';

import UsersRepository from './users.repo';



const usersRepo = new UsersRepository();

const app = express();

const userRouter = Router();
userRouter.get('/', async (req: Request, res: Response) => {
  // TODO: service layer here
  const users = usersRepo.getAll();
  return res.json({ users });
});

app.use('/users', userRouter);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});