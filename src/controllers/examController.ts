import { Request, Response } from "express";
import { ExamData, examService } from "../services/examService.js";

export async function postExam(req: Request, res: Response) {
    const data : ExamData = req.body
    await examService.post(data)
    res.sendStatus(201)
}
export async function getExamBySubject(req: Request, res: Response) {
    const { subject }= req.query
    if(typeof subject!=='string')throw{type:'bad request', message:'missing subject'}
    const response = await examService.getBySubject(subject)
    res.status(200).send(response)
}
export async function getExamByInstructor(req: Request, res: Response) {
    const { instructor }= req.query
    if(typeof instructor!=='string')throw{type:'bad request', message:'missing instructor'}
    const response = await examService.getByInstructor(instructor)
    console.log(response)
    res.status(200).send(response)
}