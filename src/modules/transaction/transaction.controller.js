import { Router } from "express";
import * as US from "./transaction.service.js";
import * as UV from "./transaction.validation.js";
import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import { userRoles } from "../../DB/models/user.model.js";


const transactionRouter = Router({ caseSensitive: true, strict: true });


transactionRouter.post("/borrow" , authentication ,validation(UV.borrowBookSchema), authorization([userRoles.ADMIN, userRoles.USER]), US.borrowBook);
transactionRouter.put("/return", authentication, validation(UV.returnBookSchema), authorization([userRoles.ADMIN, userRoles.USER]), US.returnBook);
transactionRouter.get("/history", authentication, authorization([userRoles.ADMIN, userRoles.USER]), US.getTransactionHistory);




export default transactionRouter;