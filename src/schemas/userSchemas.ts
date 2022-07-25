import Joi from "joi";
import { UserData } from "../services/userService.js";

export const signUpSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(10).required(),
    confirmPassword:Joi.ref('password')
})

export const signInSchema=Joi.object<UserData>({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})