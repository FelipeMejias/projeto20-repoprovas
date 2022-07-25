import { prisma } from "../src/config/database.js";

async function insertTerm(number:number){
    await prisma.term.create({data:{number}})
}
async function insertCategory(name:string){
    await prisma.category.create({data:{name}})
}
async function insertTeacher(name:string){
    await prisma.teacher.create({data:{name}})
}
async function insertDiscipline(name:string,termId:number){
    await prisma.discipline.create({data:{name,termId}})
}
async function insertTeacherDiscipline(teacherId:number,disciplineId:number){
    await prisma.teacherDiscipline.create({data:{teacherId,disciplineId}})
}

async function main(){
    await insertTerm(1)
    await insertTerm(2)
    await insertTerm(3)
    await insertTerm(4)
    await insertTerm(5)
    await insertTerm(6)
    await insertCategory('Projeto');
    await insertCategory('Prática');
    await insertCategory('Recuperação');
    await insertTeacher('Diego Pinho');
    await insertTeacher('Bruna Hamori');
    await insertDiscipline('HTML e CSS', 1);
    await insertDiscipline('JavaScript', 2);
    await insertDiscipline('React', 3);
    await insertDiscipline('Humildade', 1);
    await insertDiscipline('Planejamento', 2);
    await insertDiscipline('Autoconfiança', 3);
    await insertTeacherDiscipline(1, 1);
    await insertTeacherDiscipline(1, 2);
    await insertTeacherDiscipline(1, 3); 
    await insertTeacherDiscipline(2, 4);
    await insertTeacherDiscipline(2, 5);
    await insertTeacherDiscipline(2, 6);
}

main().catch((e)=>{
    console.log(e)
    process.exit()
}).finally(async () => {
    await prisma.$disconnect()
})