import userRouter from './modules/users/controller'
import authRouter from './modules/auth/controller'
import { Router } from 'express'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)

export default router