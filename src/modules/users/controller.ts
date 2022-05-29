import { Router, Request, Response } from 'express';
import UsersRepository from './repo';
import { z } from 'zod';
import { validateBody } from '../../middlewares/validation';
import bcrypt from 'bcrypt';

const userParamsSchema = z.object({
  username: z.string().max(20),
  password: z.string().max(20),
  email: z.string().max(80),
});

const usersRepo = new UsersRepository();

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await usersRepo.getAll();
  return res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await usersRepo.getOne(id);
  return res.json(user);
});
router.post('/', validateBody(userParamsSchema), async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userId = await usersRepo.create({ username, email, encrypted_password: hashedPassword })
  return res.json(userId);
});
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await usersRepo.delete(id);
  return res.status(200).end();
})

export default router;