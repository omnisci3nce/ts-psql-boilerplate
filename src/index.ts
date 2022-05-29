import express, { Request, Response, Router } from 'express';
import helmet from 'helmet';
import { UserDbDetails } from './user';
import { validateBody } from './middlewares/validation';
import bcrypt from 'bcrypt';

import UsersRepository from './users.repo';
import { z } from 'zod';

const usersRepo = new UsersRepository();

const app = express();
app.use(helmet());
app.use(express.json());

const userParamsSchema = z.object({
  username: z.string().max(20),
  password: z.string().max(20),
  email: z.string().max(80),
});

/* User Routes */
const userRouter = Router();
userRouter.get('/', async (req: Request, res: Response) => {
  // TODO: service layer here
  const users = await usersRepo.getAll();
  return res.json(users);
});

userRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await usersRepo.getOne(id);
  return res.json(user);
});
userRouter.post('/', validateBody(userParamsSchema), async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userId = await usersRepo.create({ username, email, encrypted_password: hashedPassword })
  return res.json(userId);
});
userRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await usersRepo.delete(id);
  return res.status(200).end();
})

userRouter.post('/login/:id', async (req: Request, res: Response) => {
  const { password } = req.body;
  const user = await usersRepo.getOne(req.params.id);
  if (!user) throw new Error();
  const legit = await bcrypt.compare(password, user.encrypted_password);
  if (legit) {
    return res.status(200).end();
  } else {
    return res.status(400).end();
  }
});


app.use('/users', userRouter);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});