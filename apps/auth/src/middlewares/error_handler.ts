import { Request, Response, NextFunction } from "express";
import { CustomError } from "@zsh-common/online-library-common";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(200).send({ status:err.statusCode, message: err.message });
  }

  res.status(200).send({
    status:400,
    message: "Something went wrong",
  });
};
