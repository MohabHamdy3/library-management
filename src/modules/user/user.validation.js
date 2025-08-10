import Joi from "joi";
import { generalRules } from "../../utils/index.js";


export const registerSchema = {
    body : Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }).required(),
    headers : generalRules.headers.required(),

}

export const loginUserSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }).required(),
    headers: generalRules.headers.required(),
};
