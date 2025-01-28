import express from 'express';
import { registerUser, loginUser ,userCredits} from '../controllers/userController.js';
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router()

userRouter.post('/register' , registerUser);
userRouter.post('/login' , loginUser);
userRouter.post('/credits', userAuth, userCredits);


export default userRouter

// localhost:4000/api/v1/user/register
// localhost:4000/api/v1/user/login
