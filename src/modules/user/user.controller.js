import { Router } from "express";
import * as US from "./user.service.js";
import * as UV from "./user.validation.js";
import { validation } from "../../middleware/validation.js";
import { authentication } from '../../middleware/authentication.js';
import { authorization } from './../../middleware/authorization.js';
import { userRoles } from "../../DB/models/user.model.js";
import OTPLimiter from "../../middleware/OTPexpiry.js";
import helmet from "helmet";

const userRouter = Router({ caseSensitive: true, strict: true });
userRouter.use(helmet());
userRouter.post("/register", validation(UV.registerSchema), US.registerUser);
userRouter.post("/login", OTPLimiter, validation(UV.loginUserSchema), US.loginUser);
userRouter.get("/profile", authentication, authorization([userRoles.USER]), US.getProfile);

export default userRouter;  