import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/userController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { signInSchema, signUpSchema } from "../schemas/userSchemas.js";

const userRouter = Router();

userRouter.post('/signup',validateBody(signUpSchema),postSignUp)

userRouter.post('/signin',validateBody(signInSchema),postSignIn)

export default userRouter;