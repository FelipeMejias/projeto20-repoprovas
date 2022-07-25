import {faker} from '@faker-js/faker'
import { prisma } from '../../src/config/database.js';
import { ExamData } from '../../src/services/examService.js';
function createExamData(){
    return {
        email:faker.internet.domainName(),
        pdfUrl: faker.internet.url(),
        teacherDisciplineId: 1,
        categoryId: 1
    }
}

async function createExam(data:ExamData) {
    const exam = await prisma.test.create({
        data
    })
    return exam
}

export const examFactory={
    createExamData,createExam
}