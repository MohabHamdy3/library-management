import Joi from "joi";
import { generalRules } from "../../utils/index.js";


export const borrowBookSchema = {
    body : Joi.object({
        userId: Joi.string().required(),
        bookId: Joi.string().required()
    }).required(),
    headers: generalRules.headers.required(),
}

export const returnBookSchema = {
    body : Joi.object({
        userId: Joi.string().required(),
        bookId: Joi.string().required()
    }).required(),
    headers: generalRules.headers.required().unknown(true),
}