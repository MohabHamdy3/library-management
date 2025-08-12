import { Router } from "express";
import * as US from "./book.service.js";
import * as UV from "./book.validation.js";
import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import { userRoles } from "../../DB/models/user.model.js";



const bookRouter = Router({caseSensitive: true, strict: true});

bookRouter.post("/create", authentication, validation(UV.addBookSchema), authorization([userRoles.ADMIN]), US.addBook);
bookRouter.put("/:id", authentication, validation(UV.updateBookSchema), authorization([userRoles.ADMIN]), US.updateBook);
bookRouter.get("/", authentication, authorization([userRoles.ADMIN, userRoles.USER]), US.getAllBooks);
bookRouter.delete("/:id", authentication, authorization([userRoles.ADMIN]), US.deleteBook);
bookRouter.get("/search", authentication, authorization([userRoles.ADMIN, userRoles.USER]), US.searchBooks);

export default bookRouter;
