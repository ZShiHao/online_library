import express, { Request, Response, NextFunction } from "express";
import { currentUser, requireAuth } from "@zsh-common/online-library-common";

const router = express.Router();

router.post("/api/books", requireAuth, (req: Request, res: Response) => {
  res.status(200).send({});
});

export { router as createBookRouter };
