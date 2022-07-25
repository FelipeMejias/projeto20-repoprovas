import { Router } from "express";
import { getExamByInstructor, getExamBySubject, postExam } from "../controllers/examController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { validateToken } from "../middlewares/validateToken.js";
import { examSchema } from "../schemas/examSchema.js";

const examRouter = Router();

examRouter.post('/exams' , validateToken , validateBody(examSchema) , postExam )
examRouter.get('/exams/subject', validateToken , getExamBySubject )
examRouter.get('/exams/instructor' , getExamByInstructor )

export default examRouter;