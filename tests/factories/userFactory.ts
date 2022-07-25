import {faker} from '@faker-js/faker'
import { prisma } from '../../src/config/database.js';
import bcrypt from 'bcrypt'
import { UserData } from '../../src/services/userService.js';
import jwt from 'jsonwebtoken'

function createUserData(passwordLength=10){
    return {
        email:faker.internet.email(),
        password:faker.internet.password(passwordLength)
    }
}

async function createUser(login:UserData) {
    const SALT =10
    const user = await prisma.user.create({
        data:{
            email:login.email,
            password:bcrypt.hashSync(login.password,SALT)
        }
    })
    return user
}

async function createUser_login_returnToken() {
    const userData=createUserData()
    const user =await createUser(userData)
    const token= jwt.sign({userId:user.id},process.env.JWT_SECRET)
    return token
}

async function buildAuthorizationHeader(token:string){
    return {"authorization":`Bearer ${token}`}
}

async function skipLogin(){
    const token=await createUser_login_returnToken()
    return buildAuthorizationHeader(token)
}

export const userFactory={
    createUserData,
    createUser,
    createUser_login_returnToken,
    buildAuthorizationHeader,
    skipLogin
}