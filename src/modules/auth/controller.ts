import { Router, Request, Response } from 'express'
import UsersRepository from '../users/repo';
import bcrypt from 'bcrypt';

const usersRepo = new UsersRepository();

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await usersRepo.getByUsername(username);
  if (!user) throw new Error();
  const legit = await bcrypt.compare(password, user.encrypted_password);
  if (legit) {
    return res.status(200).end();
  } else {
    return res.status(400).end();
  }
});

export default router;

