import Joi from "joi";
import { generalRules } from "../../utils/index.js";

export const addBookSchema = {
    body : Joi.object().keys({
        title: Joi.string().min(2).max(100).required(),
        author: Joi.string().min(2).max(100).required(),
        publishedYear: Joi.number().min(1000).max(9999).required(),
        availableCopies: Joi.number().min(0).required()
    }).required(),
    headers: generalRules.headers.required(),
}

export const updateBookSchema = {
    body: Joi.object().keys({
        title: Joi.string().min(2).max(100).optional(),
        author: Joi.string().min(2).max(100).optional(),
        publishedYear: Joi.number().min(1000).max(9999).optional(),
        availableCopies: Joi.number().min(0).optional()
    }).required(),
    headers: generalRules.headers.required(),
}