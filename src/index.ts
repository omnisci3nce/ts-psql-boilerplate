import express, { Request, Response, Router } from 'express';

import UsersRepository from './users.repo';

const usersRepo = new UsersRepository();

const app = express();
app.use(express.json());

/* User Routes */
const userRouter = Router();
userRouter.get('/', async (req: Request, res: Response) => {
  // TODO: service layer here
  const users = await usersRepo.getAll();
  console.log(users);
  return res.json({ users });
});

userRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await usersRepo.getOne(id);
  return res.json(user);
});
userRouter.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email } = req.body;
  const userId = await usersRepo.create({ name, email })
  return res.json(userId);
});
userRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await usersRepo.delete(id);
  return res.status(200).end();
})


app.use('/users', userRouter);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});