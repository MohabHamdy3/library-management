import transactionModel from "../DB/models/transaction.model.js";
import { userRoles } from "../DB/models/user.model.js";

export const authorization = (accessRoles = []) => {
  return (req, res, next) => {
    if (!accessRoles.includes(req?.user?.role)) {
      throw new Error("user not authorized", {
        cause: 401,
      });
    }
    return next();
  };
};

export const authorizeBorrowerOrAdmin = async (req, res, next) => {
  const transaction = await transactionModel.findById(req.params.id);
  if (!transaction) {
    throw new Error("Transaction not found", {
      cause: 404,
    });
  }
  if (req.user.role === userRoles.ADMIN || transaction.userId === req.user.id) {
    return next();
  }
  throw new Error("User not authorized , you are not allowed to return this book", {
    cause: 403,
  });
};