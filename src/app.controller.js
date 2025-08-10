import connectDB from "./DB/connectionDB.js";
import userRouter from "./modules/user/user.controller.js";
import { globalErrorHandling } from "./middleware/globalErrorHandling.js";
import cors from "cors";    
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import bookRouter from "./modules/book/book.controller.js";
import transactionRouter from "./modules/transaction/transaction.controller.js";

const whitelist = [process.env.CLIENT_URL , process.env.ADMIN_URL , process.env.WEB_CLIENT_URL,undefined ]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  message: { error : "Too many requests from this IP, please try again later"},
  handler: (req , res , next , options) => {
      res.status(options.statusCode).json({
          status: "fail",
          message: options.message
      });
  },
  skipFailedRequests: true
});
const bootstrap = (app , express)=> {
    app.use(limiter);
    app.use(cors(corsOptions));
    app.use(express.json());
    connectDB();
    app.use("uploads", express.static("uploads"));
    app.use("/users", userRouter);
    app.use("/books", bookRouter);
    app.use("/transactions", transactionRouter);
    app.use("/*demo" , (req, res, next) => {
        throw new Error(`Route not found: ${req.originalUrl}` , {
            cause : 404,
        })
    })
    app.use(morgan("dev"));

    app.use(globalErrorHandling)
}

export default bootstrap;