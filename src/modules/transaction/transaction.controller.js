import { Router } from "express";
import * as US from "./transaction.service.js";
import * as UV from "./transaction.validation.js";
import { authentication } from "../../middleware/authentication.js";
import { authorization, authorizeBorrowerOrAdmin } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import { userRoles } from "../../DB/models/user.model.js";


const transactionRouter = Router({ caseSensitive: true, strict: true });


transactionRouter.post("/borrow" , authentication ,validation(UV.borrowBookSchema), authorization([userRoles.ADMIN, userRoles.USER]), US.borrowBook);
<<<<<<< HEAD
transactionRouter.put("/return", authentication, validation(UV.returnBookSchema), authorization([userRoles.ADMIN, userRoles.USER]), authorizeBorrowerOrAdmin, US.returnBook);
transactionRouter.get("/history", authentication, validation(UV.getTransactionHistorySchema), US.loggedInUser, authorization([userRoles.ADMIN, userRoles.USER]), US.getTransactionHistory);
transactionRouter.get("/all", authentication, authorization([userRoles.ADMIN]), US.getAllTransactions);
=======
transactionRouter.put("/return", authentication, validation(UV.returnBookSchema), authorization([userRoles.ADMIN, userRoles.USER]), US.returnBook);
transactionRouter.get("/history", authentication, validation(UV.getTransactionHistorySchema), authorization([userRoles.ADMIN, userRoles.USER]), US.getTransactionHistory);



>>>>>>> 725c6674ff7fa53546b00494a3299f2c58ddd29c

export default transactionRouter;
