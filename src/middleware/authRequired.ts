import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../error";

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthorizedError();
  next();
};
