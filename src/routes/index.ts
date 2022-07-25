import { Router } from "express";
import examRouter from "./examRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter)
router.use(examRouter)

export default router;