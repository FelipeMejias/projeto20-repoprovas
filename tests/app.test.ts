import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from '../src/config/database.js';
import { userFactory } from './factories/userFactory.js';
import { examFactory } from './factories/examFactory.js';

beforeAll(async()=>{
    const allTables=['user','term','discipline','teacher','teacherDiscipline','category','test']
    for(let table of allTables){
        await prisma[`${table}`].deleteMany({where:{}})
    }
})

describe("user endpoints", () => {
    it("signUp - given a valid email return 201", async () => {
        const login=userFactory.createUserData()
        const {status} = await supertest(app).post("/signup").send(login);
        expect(status).toEqual(201);
    });
    it("signUp - given an invalid email return 422", async () => {
        const login=userFactory.createUserData()
        login.email='a'
        const {status} = await supertest(app).post("/signup").send(login);
        expect(status).toEqual(422);
    });
    it("signIn - given an invalid password return 401", async () => {
        const login=userFactory.createUserData()
        await userFactory.createUser(login)
        login.password='wrong-password'
        const {status} = await supertest(app).post("/signin").send(login);
        expect(status).toEqual(401);
    });
    it("signIn - given an valid password return token", async () => {
        const login=userFactory.createUserData()
        await userFactory.createUser(login)
        const {body} = await supertest(app).post("/signin").send(login);
        expect(body.token).toBeTruthy();
    });
});

describe("post exam endpoints", () => {
    it("post exam - given an invalid token", async () => {
        let token=await userFactory.createUser_login_returnToken()
        token='aaaaaaa'
        const auth='Bearer '+token
        const commonHeaders={
            "authorization":auth
        }
        const examData=examFactory.createExamData()
        const {status} = await supertest(app).post("/exams").send(examData).set(commonHeaders)
        expect(status).toEqual(401);
    });
    it("post exam - given a valid token", async () => {
        let token=await userFactory.createUser_login_returnToken()
        const auth='Bearer '+token
        const commonHeaders={
            "authorization":auth
        }
        const examData=examFactory.createExamData()
        const {status} = await supertest(app).post("/exams").send(examData).set(commonHeaders)
        expect(status).toEqual(201);
    });
    it("post exam - given an invalid body", async () => {
        const header=userFactory.skipLogin()
        const examData=examFactory.createExamData()
        examData.pdfUrl='aaaa'
        const {status} = await supertest(app).post("/exams").send(examData).set(header)
        expect(status).toEqual(422);
    });
    
    
}); 

afterAll(async () => {
    await prisma.$disconnect();
});