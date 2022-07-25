import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { userService } from "../services/userService.js";

export async function validateToken( req: Request, res: Response, next: NextFunction) {
  const {authorization}=req.headers
  if(!authorization)throw{type:'bad request',message:'missing authorization'}
  
  const token=authorization.replace('Bearer ','')
  try {
    const {userId} = jwt.verify(token,process.env.JWT_SECRET) as {userId:number}
    const user = await userService.findUserById(userId);
    res.locals.user = user;
    next()
  } catch (e) {
    //throw{type:'unauthorized',message:'token not valid'}
    console.log(e)
  }
  
}