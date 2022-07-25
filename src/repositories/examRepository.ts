import { ExamData } from "../services/examService.js";
import { prisma } from "./../config/database.js";

async function selectByInstructor(teacher:string) {
  return await prisma.$executeRaw`
    SELECT t.* FROM test t
    JOIN "teacherDiscipline" td ON td.id=t."teacherDisciplineId" 
    JOIN teacher tc ON tc.id=td."teacherId"
    WHERE tc.name=${teacher}
  `;
}

async function selectBySubject(subject:string) {
  return await prisma.$executeRaw`
    SELECT t.* FROM test t
    JOIN teacherDiscipline td ON td.id=t."teacherDisciplineId" 
    JOIN discipline d ON d.id=td."teacherId"
    WHERE d.name=${subject}
`;
  }

async function insert(data: ExamData) {
  await prisma.test.create({
    data
  });
}

export const examRepository={
  selectByInstructor,selectBySubject,
  insert
};
