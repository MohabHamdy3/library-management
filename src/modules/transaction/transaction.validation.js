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

<<<<<<< HEAD

=======
>>>>>>> 725c6674ff7fa53546b00494a3299f2c58ddd29c
export const getTransactionHistorySchema = {
    body : Joi.object({
        userId: Joi.string().required()
    }).required(),
    headers: generalRules.headers.required().unknown(true),
<<<<<<< HEAD
}
=======
}
>>>>>>> 725c6674ff7fa53546b00494a3299f2c58ddd29c
