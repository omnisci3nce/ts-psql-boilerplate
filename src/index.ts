import express from 'express';
import helmet from 'helmet';
import userRouter from './modules/users/controller';
import authRouter from './modules/auth/controller';

const app = express();
app.use(helmet());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});