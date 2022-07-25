import { User } from "@prisma/client";
import { userRepository } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type UserData = Omit<User,'id'>

async function signUp(data:any){
  const possibleUser=await userRepository.findByEmail(data.email)
  if(possibleUser)throw {type:'bad body', message: 'this email is already in use'}
  const SALT = 10
  const hashedPassword = bcrypt.hashSync(data.password,SALT)
  data.password=hashedPassword
  await userRepository.insert(data)
}

async function signIn(data:UserData){
    const user=await userRepository.findByEmail(data.email)
    if(!user || !bcrypt.compareSync(data.password,user.password)) throw {type:'unauthorized',message:'wrong user or password'}
    const token= jwt.sign({userId:user.id},process.env.JWT_SECRET)
    return {token}
}

async function findUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw {type:'not found',message:"user not found"};
  return user;
}

export const userService={
  signIn,signUp,findUserById
}