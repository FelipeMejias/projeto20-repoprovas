import Joi from "joi";
import { ExamData } from "../services/examService.js";

export const examSchema=Joi.object<ExamData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    teacherDisciplineId: Joi.number().required(),
    categoryId: Joi.number().required()
})
