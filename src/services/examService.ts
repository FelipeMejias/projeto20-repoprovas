import { Test } from "@prisma/client";
import { examRepository } from "../repositories/examRepository.js";

export type ExamData = Omit<Test,'id'>

async function post(data:ExamData){
  await examRepository.insert(data)
}

async function getBySubject(subject:string){
  return await examRepository.selectBySubject(subject)
}

async function getByInstructor(instructor:string){
  const response=await examRepository.selectByInstructor(instructor)
  console.log(response)
  return response
}

export const examService={
  post,getBySubject,getByInstructor
}